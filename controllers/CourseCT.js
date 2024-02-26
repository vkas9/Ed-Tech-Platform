const User = require("../models/User");
const catagory = require("../models/Catagory");
const Course = require("../models/Courses")
const UploadImage = require("../utils/imageUploader");

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
        const uploadThumbnail = await UploadImage(thumbnail, { folder: "VikasFolder", resource_type: "auto" });
        const newCourse = await Course.create({
            CourseName, CourseDescription, WhatYouWillLearn, Price, Catagory: catagory._id, Thumbnail: uploadThumbnail.secure_url, Instructor: req.user._id
        })
        const InstructorUser = await User.findByIdAndUpdate(req.user._id, { $push: { Courses: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        await catagory.findByIdAndUpdate({ _id: req.user._id }, { $push: { Course: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        res.status(200).json({
            success: true,
            message: "Successfully created Course",
            data: newCourse
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "somthing went wrong while creating course"
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