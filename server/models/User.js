const mongoose = require("mongoose");


const userModel = new mongoose.Schema({
    
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
    },
    Contact_Number: {
        type: Number,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    Active: {
        type: Boolean,
        required: true
    },
    Courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles",
        required:true
    },
    ProfilePicture: {
        type: String,
        required: true

    },
    CoursesProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }],
    role:{
        type:String,
        enum:["Admin","Student","Instructor"]
    },
    Active: {
        type: Boolean,
        default:true
    }
    
})
module.exports = mongoose.model("User", userModel);