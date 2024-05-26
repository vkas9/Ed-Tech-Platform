const mongoose = require("mongoose");


const CoursesSchema = new mongoose.Schema({
    CourseName:{
        type:String,
        required:true,
        
    },
    CourseDescription:{
        type:String,
        required:true,
        trim:true
    },
    WhatYouWillLearn:{
        type:String,
        time:true
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
    }
    ,
    Thumbnail:{
        type:String
    },
    Catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory",
    },
    StudentEntrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }],
    Section:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
    }



})
module.exports=mongoose.model("Course",CoursesSchema);