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
        trim:true
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
        required:true
    },
    StudentEntrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    Section:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})



CoursesSchema.pre('remove', async function(next) {
    const courseId = this._id;
  
    try {
      console.log(`Pre-remove middleware triggered for course: ${courseId}`);
  
    
      const updatedUsers = await mongoose.model('User').updateMany(
        { 
          $or: [{ Courses: courseId }, { Wishlist: courseId }] 
        },
        { 
          $pull: { Courses: courseId, Wishlist: courseId } 
        }
      );
  
      console.log(`Updated users:`, updatedUsers);
  
      next();
    } catch (err) {
      console.error('Error in pre-remove middleware:', err);
      next(err);
    }
  });
module.exports=mongoose.model("Course",CoursesSchema);