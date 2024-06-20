const User = require("../models/User");
const Catagory = require("../models/Catagory");
const Course = require("../models/Courses");
const { UploadFile } = require("../utils/fileUploader");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
const { encryptData } = require("../utils/crypto-server");
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    const thumbnail = req.files?.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details of the course",
      });
    }

    const tempDir = path.join(__dirname, "..", "public", "temp");
    const tempCompressedPath = path.join(
      tempDir,
      `compressed_${Date.now()}.jpeg`
    );

    await fs.mkdir(tempDir, { recursive: true });

    await sharp(thumbnail.tempFilePath)
      .resize(1024, 1024, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toFormat("jpeg", { quality: 80 })
      .toFile(tempCompressedPath);

    const uploadThumbnail = await UploadFile(tempCompressedPath, {
      folder: "VikasFolder",
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
      resource_type: "auto",
    });

    const newCourse = await Course.create({
      CourseName: courseName,
      CourseDescription: courseDescription,
      WhatYouWillLearn: whatYouWillLearn,
      Price: price,
      Catagory: category,
      Thumbnail: uploadThumbnail.secure_url,
      Instructor: req.user.id,
    });

    await fs.unlink(tempCompressedPath);

    const encryptCourse = encryptData(newCourse);
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { Courses: newCourse._id } },
      { new: true }
    );
    await Catagory.findByIdAndUpdate(
      category,
      { $push: { Course: newCourse._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully created Course",
      data: encryptCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the course",
      error: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Could not found Course",
      });
    }
    if (req.files) {
      const thumbnail = req.files.thumbnailImage;
      const uploadThumbnail = await UploadFile(thumbnail.tempFilePath, {
        folder: "VikasFolder",
        resource_type: "auto",
      });
      course.Thumbnail = uploadThumbnail.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();
    const updatedCourse = await Course.findOne({
      _id: courseId,
    });

    res.status(200).json({
      success: true,
      message: "Successfully created Course",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.editCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      thumbnailImage,
    } = req.body;
    const thumbnail = req.files?.thumbnailImage;
    var uploadThumbnail;
    if (thumbnail) {
      const tempDir = path.join(__dirname, "..", "public", "temp");
      const tempCompressedPath = path.join(
        tempDir,
        `compressed_${Date.now()}.jpeg`
      );

      await fs.mkdir(tempDir, { recursive: true });

      await sharp(thumbnail.tempFilePath)
        .resize(1024, 1024, { fit: sharp.fit.inside, withoutEnlargement: true })
        .toFormat("jpeg", { quality: 80 })
        .toFile(tempCompressedPath);

      uploadThumbnail = await UploadFile(tempCompressedPath, {
        folder: "VikasFolder",
        transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
        resource_type: "auto",
      });
      await fs.unlink(tempCompressedPath);
    }

    course.CourseName = courseName;
    course.CourseDescription = courseDescription;
    course.WhatYouWillLearn = whatYouWillLearn;
    course.Catagory = category;
    course.Price = price;
    course.Thumbnail = thumbnailImage || uploadThumbnail.secure_url;
    await course.save();
    const updatedCourse = await Course.findById(courseId)
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
      .exec();
    const encryptupdatedCourse = encryptData(updatedCourse);
    res.status(200).json({
      success: true,
      message: "course Updated",
      course: encryptupdatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "course not Updated",
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    var courseDetail = await Course.find({ status: "Published" })
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
      .exec();
    courseDetail.reverse();
    const encryptCourse = encryptData(courseDetail);
    return res.status(200).json({
      success: true,
      message: "Successfully received Explore Course",
      allCourse: encryptCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting Explore Course",
    });
  }
};
exports.updateWishlistDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("courseId", courseId);
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { Wishlist: courseId } },
      { new: true }
    )
      .select("-Password")
      .populate({
        path: "Profile",
      })
      .exec();
    // console.log("updatedUser",updatedUser)
    const encryptCourse = encryptData(updatedUser);
    res.status(200).json({
      success: true,
      message: "Successfully Course added to Wishlist",
      uu: encryptCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while adding course to cart",
    });
  }
};
exports.getWishlistDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedWishlist = await User.findById(userId)
      .select("-Password")
      .populate({
        path: "Wishlist",
        populate: [
          {
            path: "Instructor",
            populate: {
              path: "Profile",
            },
          },
          {
            path: "Rating_N_Reviews",
            populate: {
              path: "User",
            },
          },
          {
            path: "Catagory",
            populate: {
              path: "Course",
            },
          },
          {
            path: "StudentEntrolled",
          },
          {
            path: "Section",
            populate: {
              path: "subSection",
            },
          },
        ],
      })
      .exec();
    const encryptUpdatedWishlist = encryptData(updatedWishlist);
    res.status(200).json({
      success: true,
      message: "Successfully Fetched Wishlist",
      uWishlist: encryptUpdatedWishlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching cart list",
    });
  }
};

exports.deleteWishlistDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("courseId", courseId);
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { Wishlist: courseId } },
      { new: true }
    )
      .select("-Password")
      .populate({
        path: "Profile",
      })
      .exec();
    // console.log("updatedUser",updatedUser)
    const encryptUpdatedUser = encryptData(updatedUser);
    res.status(200).json({
      success: true,
      message: "Successfully Course deleted from Wishlist",
      uUser: encryptUpdatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while deleting course from Wishlist",
    });
  }
};

exports.getAllCourseDetail = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetail = await Course.findById(courseId)
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
      .exec();

    if (!courseDetail) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully Received all Course Detail",
      courseDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
      message: "Something went wrong while getting all Course Detail",
    });
  }
};
exports.deleteEnrolledCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const userId = req.user.id;
    const currentCourseUser = await User.findById(userId);

    const updatedCourseUser = currentCourseUser.Courses.filter(
      (course) => course.toString() !== courseId
    );
    currentCourseUser.Courses = updatedCourseUser;

    await currentCourseUser.save();
    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { StudentEntrolled: userId } },
      { new: true }
    );

    var courseDetail = [];
    for (let i = 0; i < currentCourseUser.Courses.length; i++) {
      courseDetail.push(
        await Course.findById(currentCourseUser.Courses[i])
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
    const encryptCourseDetail = encryptData(courseDetail);
    return res.status(200).json({
      success: true,
      message: "Course Successfully unenrolled",
      courseDetail: encryptCourseDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: true,
      message: "Course not unenrolled",
    });
  }
};
exports.deleteInstructorCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { Courses: courseId, Wishlist: courseId } },
      { new: true }
    )
      .select("-Password")
      .populate({
        path: "Profile",
      })
      .exec();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const coursePromises = updatedUser.Courses.map((courseid) =>
      Course.findById(courseid)
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
    let courseDetail = await Promise.all(coursePromises);
    courseDetail = courseDetail.reverse();

    // Encrypt the updated user data
    const encryptedCourse = encryptData(updatedUser);
    const encryptedCourseDetail = encryptData(courseDetail);

    // Send the response
    return res.status(200).json({
      success: true,
      message: "Successfully deleted course",
      uur: encryptedCourse,
      imc: encryptedCourseDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Problem with deleting course",
    });
  }
};
