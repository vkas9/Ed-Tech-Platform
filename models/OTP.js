const mongoose=require("mongoose");

const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    },
    OTP:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("OTP",OtpSchema)