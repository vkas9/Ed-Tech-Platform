const user=require("../models/User");
const profile=require("../models/Profile");
const Courses=require("../models/Courses")
exports.updateProfile=async(req,res)=>{
    try {
        const{City,contactNumber,Country,Gender,about,dateOfBirth}=req.body;
        const userId=req.user.id;
        if(!City||!contactNumber||!Country||!Gender||!about||!userId||!dateOfBirth){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of Profile"
            })
        }
        const userDetail=await user.findById(userId);
        const profileId=userDetail.Profile;
        const profileDetail=await profile.findById(profileId);
        profileDetail.dateOfBirth=dateOfBirth;
        profileDetail.contactNumber=contactNumber;
        profileDetail.Country=Country;
        profileDetail.Gender=Gender;
        profileDetail.about=about;
        profileDetail.City=City;
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
exports.getAllUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetail=await user.findById(id);
        const courseDetail=await Courses.findById(userDetail.Courses[0]).populate({
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
        return res.status(200).json({
            success:true,
            message:"successfully Received Course Detail",
            courseDetail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while Getting user detail"
        })
    }
}
exports.getEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.user.id;
        const userDetails=await courses.findById(userId).populate().exec();
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