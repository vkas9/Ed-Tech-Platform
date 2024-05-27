const app=require('express');
const router=app.Router();


const{deleteAccount,getEnrolledCourses, getAllInstructorCourses}=require("../controllers/ProfileCT");
const {auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/getAllInstructorCourses",auth,isInstructor,getAllInstructorCourses);

module.exports=router;