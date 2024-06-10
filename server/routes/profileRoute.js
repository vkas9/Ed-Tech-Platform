const app=require('express');
const router=app.Router();


const{deleteAccount,getEnrolledCourses, getAllInstructorCourses, updateProfile, updateDisplayProfile}=require("../controllers/ProfileCT");
const {auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/getAllInstructorCourses",auth,isInstructor,getAllInstructorCourses);
router.post("/updateProfile",auth,updateProfile);
router.post("/updateDisplayProfile",auth,updateDisplayProfile);

module.exports=router;