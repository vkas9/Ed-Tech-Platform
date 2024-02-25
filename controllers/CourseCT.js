const User = require("../models/User");
const Tag = require("../models/Tags");
const Course = require("../models/Courses")
const UploadImage=require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try {
        const { CourseName, CourseDescription, WhatYouWillLearn, Price, tag, } = req.body;
        const thumbnail = req.files.thumbnailImage;
        if (!CourseName || !CourseDescription || !WhatYouWillLearn || !Price || !tag || !thumbnail) {
            return res.status(401).json({
                success: false,
                message: "Please fill all detail of Course"
            })
        }
        const uploadThumbnail=await UploadImage(thumbnail,{folder:"VikasFolder",resource_type : "auto"});
        const newCourse = await Course.create({
            CourseName, CourseDescription, WhatYouWillLearn, Price, Tags:tag._id, Thumbnail:uploadThumbnail.secure_url,Instructor:req.user._id
        })
        const InstructorUser = await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { Courses: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        await Tag.findByIdAndUpdate({ _id: req.user._id }, { $push: { Course: newCourse._id } }, { new: true });
        console.log("InstructorUser->", InstructorUser);
        res.status(200).json({
            success:true,
            message:"Successfully created Course",
            data:newCourse
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "somthing went wrong while creating course"
        })

    }
}