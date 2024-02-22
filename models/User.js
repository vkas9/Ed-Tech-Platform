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
        ref: "Courses"
    }],
    Profile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles"
    }],
    ProfilePicture: {
        type: String,
        required: true

    },
    CoursesProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }]
})
module.exports = mongoose.model("User", userModel);