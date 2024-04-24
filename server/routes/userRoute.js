const app=require('express');
const router=app.Router();

const{auth}=require("../middlewares/middlewareAuth");
const {login,signup,otp,changePassword}=require("../controllers/Auth");
const {updateProfile} =require("../controllers/ProfileCT")
router.post("/login",login);
router.post("/signup",signup);
router.post("/otp",otp);
router.post("/profile",auth,updateProfile)
router.post("/changepassword",auth,changePassword)



module.exports=router;