const user=require("../models/User");
const profile=require("../models/Profile");

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
        const userDetail=await user.findById(id).populate("Profile").exec();

        return res.status(200).json({
            success:true,
            message:"successfully Received User Detail",
            userDetail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while Getting user detail"
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