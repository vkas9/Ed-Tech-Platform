const Course = require("../models/Courses");
const user = require("../models/User");
const { razorpayInstance } = require("../config/razorpay");
const sendmail = require("../utils/sendMail");
const { default: mongoose } = require("mongoose");
const { encryptData } = require("../utils/crypto-server");
require("dotenv").config();
exports.createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId) {
      return res.json({
        success: false,
        message: "please Provide valid course ID",
      });
    }
    let course;
    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Could't find the course with this Course Id ",
        });
      }
      const userObjectId = new mongoose.Types.ObjectId(userId);
      if (course.StudentEntrolled.includes(userObjectId)) {
        return res.status(400).json({
          success: false,
          message: "Already Student Enrolled with this user ID",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    
    const userG=await user.findById(userId);
    const amount = course.Price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: `${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      notes: {
        courseId,
        userId,
      },
    };
   
      const paymentRespone = razorpayInstance.orders.create(options,(err,order)=>{
        
        if(!err){
          return res.status(200).json({
            success: true,
            courseName: course.CourseName,
            courseDescription: course.CourseDescription,
            thumbnail: course.Thumbnail,
            order_id: order.id,
            key_id:razorpayInstance.key_id,
            currency: order.currency,
            amount: order.amount,
            contact:userG.Contact_Number,
            name:userG.FirstName,
            email:userG.Email,
            message: "Successfully received response from RazorPay!",
          });
        }
        else{
          console.log("err",err);
          return res.json({
            success: false,
            message: err.message,
          });
        }
      });
    console.log("paymentRespone",paymentRespone)
    
      
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't Initiate Order",
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const {courseId} = req.body;
     
        
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { $push: { StudentEntrolled: userId } },
          { new: true }
        );
        if (!updatedCourse) {
          return res.status(500).json({
            success: false,
            message: "Course Not Found",
          });
        }
        const enrolledStudent = await user.findByIdAndUpdate(
          userId,
          { $push: { Courses: courseId } },
          { new: true }
        ).select("-Password").populate({ path: "Profile"}).populate({path:"Cart"}).exec()
        const encryptUser =encryptData(enrolledStudent);
       await sendmail(
          enrolledStudent.Email,
          "Congratulations from MASTER",
          `Congratulations you have successfully Enrolled ${updatedCourse.CourseName} Course`
        );
        return res.status(200).json({
          success: true,
          message: "Payment Successfull",
          ey:encryptUser
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while Enrolling course",
        });
      }
    
  
  
};


