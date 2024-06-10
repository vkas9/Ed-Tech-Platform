const user = require("../models/User");
const profile = require("../models/Profile");
const Courses = require("../models/Courses");
const { UploadFile } = require("../utils/fileUploader");
const fs = require('fs/promises');
const sharp=require("sharp");
const path=require('path');
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
    const registredUser = await user.findById(userId).populate({ path: "Profile"}).exec()
    return res.status(200).json({
      success: true,
      message: "successfully update user Profile",
      registredUser
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
    return res.status(200).json({
      success: true,
      message: "successfully Received Course Detail",
      courseDetail,
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
    res.status(200).json({
      success: true,
      message: "Successfully Received Intructor All Courses",
      instructorCourses,
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
      .resize(480, 480, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toFormat("jpeg", { quality: 80 })
      .toFile(tempCompressedPath);

    const image = await UploadFile(tempCompressedPath, {
      folder: "VikasFolder",
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
      resource_type: "auto",
    });

   
    const updatedProfile = await user.findByIdAndUpdate(
      { _id: userId },
      { avatar: image.secure_url },
      { new: true }
    );
    
    await fs.unlink(tempCompressedPath);
    res.status(200).json({
      status: "true",
      message: "Successfully updated Profile image",
      updatedProfile,
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
