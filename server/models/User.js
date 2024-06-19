const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const userModel = new mongoose.Schema({
    
    FirstName: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
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
        default:true
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
    avatar: {
        type: String,
        required: true

    },
    refreshToken:{
        type:String,
        default: ""
    }
    ,
    CoursesProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }],
    role:{
        type:String,
        enum:["Student","Instructor"]
    },
    Cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    purchaseHistory:[{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        purchasedAt: {
            type: Date,
            default: Date.now
        }
    }]
    
},{timestamps:true})

userModel.methods.generateAccessToken=function(){
    return jwt.sign({
        email: this.Email,
        role: this.role,
        id: this._id,
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

userModel.methods.generateRefreshToken=function(){
    return jwt.sign({
        id: this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
module.exports = mongoose.model("User", userModel);