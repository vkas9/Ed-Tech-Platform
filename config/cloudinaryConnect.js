const cloudinary=require("cloudinary");
require("dotenv").config();

exports.ConnectToCloudinary=()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
            secure:true
        })
    } catch (error) {
        console.log(error)
    }
}