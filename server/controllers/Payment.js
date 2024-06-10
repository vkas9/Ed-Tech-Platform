const Course = require("../models/Courses");
const user = require("../models/User");
const { instance } = require("../config/razorpay");
const sendmail = require("../utils/sendMail");
require("dotenv").config();
exports.capturePayment = async (req, res) => {
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
    const amount = course.Price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now().toString()),
      notes: {
        courseId,
        userId,
      },
    };
    try {
      const paymentRespone = await instance.orders.create(options);
      console.log(paymentRespone);
      return res.status(200).json({
        success: true,
        courseName: Course.CourseName,
        courseDescription: Course.CourseDescription,
        thumbnail: Course.Thumbnail,
        orderId: paymentRespone.id,
        currency: paymentRespone.currency,
        amount: paymentRespone.amount,
        message: "Successfully received response from RazorPay!",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't Initiate Order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const course = req.body?.course;
    const userId = req.user.id;
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !course ||
      !userId
    ) {
      return res.status(400).json({
        success: "false",
        message: "Payment Failed",
      });
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      console.log("Payment Authorized!");
      try {
        if (!userId || !course) {
          return res.status(402).json({
            success: false,
            message: "Please Provide data for Coursess or UserId",
          });
        }
        const updatedCourse = await Course.findByIdAndUpdate(
          course._id,
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
          { $push: { Courses: course._id } },
          { new: true }
        );
        const mailResponse = await sendmail(
          enrolledStudent.Email,
          "Congo. from MASTER",
          `Congo. you have successfully enrolled ${course.CourseName} Course`
        );
        return res.status(200).json({
          success: true,
          message: "Signature verified and Course Added",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while adding course",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verify Signature",
    });
  }
};

// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "23421354213";
//         const signature = req.headers["x-razorpay-signature"];
//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest=shasum.digest("hex");
//         if(signature===digest){
//             console.log("Payment is Authorised");
//             const {courseId,userId}=req.body.payload.payment.entity.notes;
//             try {
//                 const EnrolledCourse=await course.findByIdAndUpdate(courseId,
//                     {$push:{StudentEntrolled:userId}},{new:true}
//                     );
//                 if(!EnrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not found"
//                     })
//                 }
//                 const enrolledStudent=await user.findByIdAndUpdate(userId,{$push:{Courses:courseId}},{new:true});
//                 console.log(enrolledStudent);

//                 const mailResponse=await sendmail(enrolledStudent.Email,"Congo. from MASTER","Congo. you have successfully enrolled The Course")
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature verified and Course Added"
//                 })
//             } catch (error) {
//                 console.log(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:"Something went wrong while adding course"
//                 })
//             }
//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"Invalid Request"
//             })
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong while verify Signature"
//         })
//     }
// }
