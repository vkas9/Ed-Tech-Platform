const user = require("../models/User");
const profile = require("../models/Profile");
const Courses = require("../models/Courses");
const {uploadDigital } = require("../utils/fileUploader");
const fs = require('fs/promises');
const mongoose=require("mongoose")
const sharp=require("sharp");
const path=require('path');
const { encryptData } = require("../utils/crypto-server");
exports.updateProfile = async (req, res) => {
  try {
    const { contactNumber, city, gender, dateOfBirth } = req.body;
    const userId = req.user.id;
    const userDetail = await user.findById(userId);
    const profileId = userDetail.Profile;
    const profileDetail = await profile.findById(profileId);
    if (dateOfBirth !== null) {
      profileDetail.dateOfBirth = dateOfBirth;
    }
    if (contactNumber !== "") {
      profileDetail.contactNumber = contactNumber;
    }
    if (city !== "") {
      profileDetail.city = city;
    }
    if (gender !== "") {
      profileDetail.gender = gender;
    }
    await profileDetail.save();
    const registredUser = await user.findById(userId).select("-Password").populate({ path: "Profile"}).exec()

    const encryptUser=encryptData(registredUser)
    return res.status(200).json({
      success: true,
      message: "successfully update user Profile",
      registredUser:encryptUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating Profile",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await user.findById(id);
    var courseDetail = [];
    for (let i = 0; i < userDetail.Courses.length; i++) {
      courseDetail.push(
        await Courses.findById(userDetail.Courses[i])
          .populate({
            path: "Instructor",
            populate: {
              path: "Profile",
            },
          })
          .populate({
            path: "Rating_N_Reviews",
            populate: {
              path: "User",
            },
          })
          .populate({
            path: "Catagory",
            populate: {
              path: "Course",
            },
          })
          .populate("StudentEntrolled")
          .populate("Section")
          .populate({
            path: "Section",
            populate: {
              path: "subSection",
            },
          })
          .exec()
      );
    }
    courseDetail.reverse();
    const encryptEnrolledCourses=encryptData(courseDetail)
    return res.status(200).json({
      success: true,
      message: "successfully Received Course Detail",
      courseDetail:encryptEnrolledCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Getting Enrolled Courses detail",
    });
  }
};

exports.getAllInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetail = await user.findById(userId);
    var instructorCourses = [];
    for (let i = 0; i < userDetail.Courses.length; i++) {
      instructorCourses.push(
        await Courses.findById(userDetail.Courses[i])
          .populate({
            path: "Instructor",
            populate: {
              path: "Profile",
            },
          })
          .populate({
            path: "Rating_N_Reviews",
            populate: {
              path: "User",
            },
          })
          .populate({
            path: "Catagory",
            populate: {
              path: "Course",
            },
          })
          .populate("StudentEntrolled")
          .populate("Section")
          .populate({
            path: "Section",
            populate: {
              path: "subSection",
            },
          })
          .exec()
      );
    }
    instructorCourses.reverse();
    const encryptInstructorCourses=encryptData(instructorCourses)
    res.status(200).json({
      success: true,
      message: "Successfully Received Intructor All Courses",
      iCourses:encryptInstructorCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "Something went wrong while Receiving Intructor All Courses",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await user.findById(userId).populate().exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await user.findById(id);
    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    await profile.findByIdAndDelete({ _id: userDetail.Profile });
    await user.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "successfully Delete Account",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Deleting Account",
    });
  }
};

exports.updateDisplayProfile = async (req, res) => {
  try {
    const photo = req.files?.profilePicture;
    const userId = req.user.id;
   
    const tempDir = path.join(__dirname, "..", "public", "temp");
    const tempCompressedPath = path.join(
      tempDir,
      `compressed_${Date.now()}.jpeg`
    );
    await fs.mkdir(tempDir, { recursive: true });
    await sharp(photo.tempFilePath)
      .resize(1080, 1080, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toFormat("jpeg", { quality: 100 })
      .toFile(tempCompressedPath);

    const image = await uploadDigital(tempCompressedPath)

   
    const updatedProfile = await user.findByIdAndUpdate(
      { _id: userId },
      { avatar: image.publicUrl },
      { new: true }
    ).select("-Password").populate({ path: "Profile"}).exec()
    
    await fs.unlink(tempCompressedPath);

    const encryptUpdateDisplayProfile=encryptData(updatedProfile)
    res.status(200).json({
      status: "true",
      message: "Successfully updated Profile image",
      updatedProfile:encryptUpdateDisplayProfile,
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updatePurchaseHistory=async(req,res)=>{
  try {
    const {courseId}=req.body;
    const userId=req.user.id;
    
    // const objectId = new mongoose.Types.ObjectId(courseId)
    // console.log("objectId-:>",objectId)
    const purchaseItem = {
      courseId: courseId,
      purchasedAt: new Date()
    };

    const usr=await user.findByIdAndUpdate(userId,{$push:{purchaseHistory:purchaseItem}},{new:true});
    console.log("usr",usr)
    res.status(200).json({
      success:true,
      message:"updated"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"not updated"
    })
  }
}
exports.getPurchaseHistory=async(req,res)=>{
  try {
    const userId = req.user.id;
    const userDetails = await user.findById(userId)
  .select("-Password -refreshToken")
  .populate({
    path: "purchaseHistory.courseId",
    populate: [
      { path: "Instructor" },
      { 
        path: "Section",
        populate: { path: "subSection" }
      }
    ]
  })
  .exec();
    const encryptUserDetails=encryptData(userDetails)
    res.status(200).json({
      success:true,
      purhc:encryptUserDetails

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false
    })
  }
}