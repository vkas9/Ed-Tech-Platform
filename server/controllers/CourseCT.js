const User = require("../models/User");
const Catagory = require("../models/Catagory");
const Course = require("../models/Courses")
const {UploadFile} = require("../utils/fileUploader");
const sharp=require("sharp");
const path=require('path');
const fs = require('fs/promises');
exports.createCourse = async (req, res) => {
    try {

        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        const thumbnail = req.files?.thumbnailImage;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details of the course"
            });
        }

        const tempDir = path.join(__dirname, '..', 'public', 'temp');
        const tempCompressedPath = path.join(tempDir, `compressed_${Date.now()}.jpeg`);

        await fs.mkdir(tempDir, { recursive: true });

        await sharp(thumbnail.tempFilePath)
            .resize(1024, 1024, { fit: sharp.fit.inside, withoutEnlargement: true })
            .toFormat('jpeg', { quality: 80 })
            .toFile(tempCompressedPath);

        const uploadThumbnail = await UploadFile(tempCompressedPath, {
            folder: "VikasFolder",
            transformation: [
                { quality: "auto:good" },
                { fetch_format: "auto" }
            ],
            resource_type: "auto"
        });

        const newCourse = await Course.create({
            CourseName: courseName,
            CourseDescription: courseDescription,
            WhatYouWillLearn: whatYouWillLearn,
            Price: price,
            Catagory: category,
            Thumbnail: uploadThumbnail.secure_url,
            Instructor: req.user.id
        });

        await fs.unlink(tempCompressedPath);

       
        await User.findByIdAndUpdate(req.user.id, { $push: { Courses: newCourse._id } }, { new: true });
        await Catagory.findByIdAndUpdate(category, { $push: { Course: newCourse._id } }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully created Course",
            data: newCourse
        });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the course",
            error: error.message
        });
    }
};

exports.updateCourse=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const updates=req.body;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(401).json({
                success:false,
                message:"Could not found Course"
            })
        }
        if(req.files){
            const thumbnail = req.files.thumbnailImage;
            const uploadThumbnail = await UploadFile(thumbnail.tempFilePath, { folder: "VikasFolder", resource_type: "auto" });
            course.Thumbnail=uploadThumbnail.secure_url;
        }
        
    
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
  
        res.status(200).json({
            success: true,
            message: "Successfully created Course",
            updatedCourse
        })

        

    } catch (error) {
        console.log(error);
        
    }
}
exports.editCourseDetails=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const course=await Course.findById(courseId);
        const { courseName, courseDescription, whatYouWillLearn, price, category,thumbnailImage } = req.body;
        const thumbnail = req.files?.thumbnailImage;
        var uploadThumbnail;
        if(thumbnail){
            const tempDir = path.join(__dirname, '..', 'public', 'temp');
            const tempCompressedPath = path.join(tempDir, `compressed_${Date.now()}.jpeg`);
    
            await fs.mkdir(tempDir, { recursive: true });
    
            await sharp(thumbnail.tempFilePath)
                .resize(1024, 1024, { fit: sharp.fit.inside, withoutEnlargement: true })
                .toFormat('jpeg', { quality: 80 })
                .toFile(tempCompressedPath);
    
            uploadThumbnail = await UploadFile(tempCompressedPath, {
                folder: "VikasFolder",
                transformation: [
                    { quality: "auto:good" },
                    { fetch_format: "auto" }
                ],
                resource_type: "auto"
            });
            await fs.unlink(tempCompressedPath);
        }
        
        
        course.CourseName=courseName;
        course.CourseDescription=courseDescription;
        course.WhatYouWillLearn=whatYouWillLearn;
        course.Catagory=category;
        course.Price=price;
        course.Thumbnail=thumbnailImage||uploadThumbnail.secure_url
        await course.save()
        res.status(200).json({
        success:true,
        message:"course Updated",
        course
       })


        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:true,
            message:"course not Updated"
           }) 
        
    }
}

exports.getAllCourse = async (req, res) => {
    try {
        // const allCourse = await Course.find({status:"Published"}).sort({createdAt:-1});
        
        
        var courseDetail=await Course.find({status:"Published"}).populate({
            path: "Instructor",
            populate: {
                path: "Profile"
            }
        }).populate({
            path: "Rating_N_Reviews",
            populate: {
                path: "User"
            }
        }).populate({
            path: "Catagory",
            populate: {
                path: "Course"
            }
        }).populate("StudentEntrolled").populate("Section").populate({
            path: "Section",
            populate: {
                path: "subSection",
            },
        }).exec();
        courseDetail.reverse();
        return res.status(200).json({
            success: true,
            message: "Successfully received Explore Course",
            allCourse:courseDetail
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while getting Explore Course"
        })
    }
}
exports.updateCartDetails=async(req,res)=>{
    try {
        const{courseId}=req.body;
        console.log("courseId",courseId)
        const userId=req.user.id;
        
        const updatedUser=await User.findByIdAndUpdate(userId,{$push:{Cart:courseId}},{new:true});
        console.log("updatedUser",updatedUser)
        res.status(200).json({
            success:true,
            message:"Successfully Course added to Cart",
            updatedUser
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while adding course to cart"
        })
    }
}
exports.getCartDetails=async(req,res)=>{
    try {
        const userId=req.user.id;
        const updatedCart=await User.findById(userId).populate({path:"Cart"}).exec();
        res.status(200).json({
            success:true,
            message:"Successfully Fetched Cart",
            updatedCart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching cart list"
        })
    }
}

exports.deleteCartDetails=async(req,res)=>{
    try {
        const{courseId}=req.body;
        console.log("courseId",courseId)
        const userId=req.user.id;
        
        const updatedUser=await User.findByIdAndUpdate(userId,{$pull:{Cart:courseId}},{new:true});
        console.log("updatedUser",updatedUser)
        res.status(200).json({
            success:true,
            message:"Successfully Course deleted from Wishlist",
            updatedUser
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while deleting course from Wishlist"
        })
    }
}

exports.getAllCourseDetail = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetail = await Course.findById(courseId).populate({
            path: "Instructor",
            populate: {
                path: "Profile"
            }
        }).populate({
            path: "Rating_N_Reviews",
            populate: {
                path: "User"
            }
        }).populate({
            path: "Catagory",
            populate: {
                path: "Course"
            }
        }).populate("StudentEntrolled").populate("Section").exec();

        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully Received all Course Detail",
            courseDetail
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error,
            message:"Something went wrong while getting all Course Detail"
        })
    }
}
