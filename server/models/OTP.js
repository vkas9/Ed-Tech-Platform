const mongoose=require("mongoose");
const mailSender=require("../utils/sendMail");
const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires:50*60*60,
        required:true
    },
    OTP:{
        type:String,
        required:true
    }
})

const sendMail=async(email,otp)=>{
    try {
        const mail=await mailSender(email,"Verification Email from Vikas",otp);
        console.log("Email Successfull : ",email);
    } catch (error) {
        console.log("Something went Wrong while sending mail")
        console.log(error)
    }
}

OtpSchema.pre("save",async function(next){
    console.log("this mail",this.email);
    await sendMail(this.email,this.OTP)
    next();
})

module.exports=mongoose.model("OTP",OtpSchema)