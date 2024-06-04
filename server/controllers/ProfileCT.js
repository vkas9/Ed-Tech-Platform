const user=require("../models/User");
const profile=require("../models/Profile");
const Courses=require("../models/Courses");
const { UploadFile } = require("../utils/fileUploader");
exports.updateProfile=async(req,res)=>{
    try {
        const{contactNumber,Country="",about="",dateOfBirth=""}=req.body;
        const userId=req.user.id;
        const userDetail=await user.findById(userId);
        const profileId=userDetail.Profile;
        const profileDetail=await profile.findById(profileId);
        profileDetail.dateOfBirth=dateOfBirth;
        profileDetail.contactNumber=contactNumber;
        profileDetail.Country=Country;
        profileDetail.about=about;
        await profileDetail.save();
        return res.status(200).json({
            success:true,
            message:"successfully update user Profile"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating Profile"
        })
    }
}

exports.getEnrolledCourses=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetail=await user.findById(id);
        var courseDetail=[];
        for(let i=0;i<userDetail.Courses.length;i++){
            courseDetail.push( await Courses.findById(userDetail.Courses[i]).populate({
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
        }).exec());
    }
    courseDetail.reverse();
        return res.status(200).json({
            success:true,
            message:"successfully Received Course Detail",
            courseDetail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while Getting Enrolled Courses detail"
        })
    }
}

exports.getAllInstructorCourses=async(req,res)=>{
    try {
        const userId=req.user.id;
        const instructorCourses = await Courses.find({
            Instructor: userId,
          }).sort({ createdAt: -1 })

          res.status(200).json({
            success:true,
            message:"Successfully Received Intructor All Courses",
            instructorCourses

          })
        
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success:false,
            message:"Something went wrong while Receiving Intructor All Courses"
        })
        
    }
}



exports.getAllUserDetails=async(req,res)=>{
    try {
        const userId=req.user.id;
        const userDetails=await user.findById(userId).populate().exec();
        
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find user with id: ${userId}`
            })
        }
        return res.status(200).json({
            success:true,
            data:userDetails
        })
    } catch (error) {
        return res.status(500).json({
            succcess:false,
            message:error.message
        })
    }
}



exports.deleteAccount=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetail=await user.findById(id);
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }
        await profile.findByIdAndDelete({_id:userDetail.Profile});
        await user.findByIdAndDelete(id);
        return res.status(200).json({
            success:true, 
            message:"successfully Delete Account"
        })
       
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while Deleting Account"
        })
    }
}

exports.updateDisplayProfile=async(req,res)=>{
    try {
        const photo=req.files.profilePhoto;
        const userId=req.user.id;
        const image=await UploadFile(photo.tempFilePath,{ folder: "VikasFolder", resource_type: "auto" });
        console.log("image->",image)
        const updatedProfile=await user.findByIdAndUpdate({_id:userId},{avatar:image.secure_url},{new:true});
        res.status(200).json({
            status:"true",
            message:"Successfully updated Profile image",
            data:updatedProfile
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
    
}