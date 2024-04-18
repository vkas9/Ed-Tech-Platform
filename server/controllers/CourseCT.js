const User = require("../models/User");
const Catagory = require("../models/Catagory");
const Course = require("../models/Courses")
const {UploadFile} = require("../utils/fileUploader");

exports.createCourse = async (req, res) => {
    try {
        const { CourseName, CourseDescription, WhatYouWillLearn, Price, catagory } = req.body;
        const thumbnail = req.files.thumbnailImage;
        if (!CourseName || !CourseDescription || !WhatYouWillLearn || !Price || !catagory || !thumbnail) {
            return res.status(401).json({
                success: false,
                message: "Please fill all detail of Course"
            })
        }
        const uploadThumbnail = await UploadFile(thumbnail, { folder: "VikasFolder", resource_type: "auto" });
        console.log("sldfkjsdlkfjsdf");
        const newCourse = await Course.create({
            CourseName, CourseDescription, WhatYouWillLearn, Price, Catagory: catagory, Thumbnail: uploadThumbnail.secure_url, Instructor: req.user.id
        })
        const InstructorUser = await User.findByIdAndUpdate(req.user.id, { $push: { Courses: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        await Catagory.findByIdAndUpdate({ _id: catagory }, { $push: { Course: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        res.status(200).json({
            success: true,
            message: "Successfully created Course",
            data: newCourse
        })




    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "somthing went wrong while creating course",
            error
        })

    }
}


//get all course

exports.getAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find({});
        console.log(allCourse);
        return res.status(400).json({
            success: true,
            message: "Successfully received All Course",
            course: allCourse
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while getting all Course"
        })
    }
}


exports.getAllCourseDetail = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetail = await Course.findById(courseId).populate({
            path: "Instructor",
            populate: {
                path: "Profile"
            }
        }).populate({
            path: "Rating_N_Reviews",
            populate: {
                path: "User"
            }
        }).populate({
            path: "Catagory",
            populate: {
                path: "Course"
            }
        }).populate("StudentEntrolled").populate("Section").exec();

        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully Received all Course Detail",
            courseDetail
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error,
            message:"Something went wrong while getting all Course Detail"
        })
    }
}