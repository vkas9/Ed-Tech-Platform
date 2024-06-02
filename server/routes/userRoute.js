const app=require('express');
const router=app.Router();

const{auth}=require("../middlewares/middlewareAuth");
const {login,signup,otp,changePassword, userLogOut, refreshAccessToken, forgotPasswordOTP, verifyForgotPasswordOTP, resetPassword}=require("../controllers/Auth");
const {updateProfile} =require("../controllers/ProfileCT")
router.post("/login",login);
router.post("/signup",signup);
router.post("/otp",otp);
router.post("/forgotPasswordOTP",forgotPasswordOTP);
router.post("/verifyForgotPasswordOTP",verifyForgotPasswordOTP);
router.post("/profile",auth,updateProfile)
router.post("/logout",userLogOut);
router.post("/refresh-token",refreshAccessToken)
router.post("/changepassword",auth,changePassword,(err)=>{
    if(err)console.log("err->",err)
    else console.log("success")
})
router.post("/resetPassword",resetPassword)



module.exports=router;