const app=require('express');
const router=app.Router();


const{deleteAccount,getEnrolledCourses}=require("../controllers/ProfileCT");
const {isAdmin,auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);

module.exports=router;