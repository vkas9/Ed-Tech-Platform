const mongoose = require("mongoose");


const CoursesSchema = new mongoose.Schema({
    CourseName:{
        type:String,
        required:true,
        trim:trusted,
    },
    CourseDescription:{
        type:String,
        required:true,
        trim:true
    },
    WhatYouWillLearn:{
        type:String
    }
    ,
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Rating_N_Reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingReview",
    }],
    Price:{
        type:Number,
        required:true
    },
    Thumbnail:{
        type:String
    },
    Tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    },
    StudentEntrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"studentEntrolled",
    }]



})
module.exports=mongoose.model("Course",CoursesSchema);