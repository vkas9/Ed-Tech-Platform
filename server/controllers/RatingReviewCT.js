const rr = require("../models/RatingReview");
const course = require("../models/Courses");
const { default: mongoose } = require("mongoose");


exports.createRating = async (req, res) => {
    try {
        //get user id
        //fetdata from req body
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;

        //check if user is enrolled or not 
        const courseDetail = await course.findOne({ _id: courseId, StudentEntrolled: { $elemMatch: { $eq: userId } } });
        if (!courseDetail) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in the course"
            })
        }
        //if user already reviewed the course

        const alreadyReviewd = await rr.findOne({ user: userId, course: courseId })
        if (alreadyReviewd) {
            return res.status(403).json({
                success: false,
                message: "you have already Reviewed this course"
            })
        }
        //create rating and review
        const createRR = await rr.create({ rating, review, course: courseId, user: userId });

        //update course with this rating and review
        console.log(await course.findByIdAndUpdate(courseId, { $push: { Rating_N_Reviews: createRR._id } }, { new: true }));
        return res.status(200).json({
            success: true,
            message: "Rating and review created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went while Creating Rating"
        })
    }
}


//get average rating

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;
        
        const courseDetail = await rr.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },

            },
            {

                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        if (courseDetail > 0) {
            return res.status(200).json({
                success: false,
                averageRating: courseDetail[0].averageRating
            })
        }
        return res.status(200).json({
            success: false,
            message: "Average rating is 0, no rating givern till yet",
            averageRating: 0
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while geting Average rating",

        })
    }
}

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await rr.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "Firstname LastName Email"
            }).
            populate({
                path: "course",
                select: "Courses"
            }).exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data:allReviews

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while geting all rating",

        })
    }
}