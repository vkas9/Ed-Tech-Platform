const app=require('express');
const router=app.Router();


const{deleteAccount,getEnrolledCourses, getAllInstructorCourses, updateProfile, updateDisplayProfile, updatePurchaseHistory, getPurchaseHistory}=require("../controllers/ProfileCT");
const {auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/getAllInstructorCourses",auth,isInstructor,getAllInstructorCourses);
router.post("/updateProfile",auth,updateProfile);
router.post("/updateDisplayProfile",auth,updateDisplayProfile);
router.post("/updatePurchaseHistory",auth,isStudent,updatePurchaseHistory);
router.get("/getPurchaseHistory",auth,getPurchaseHistory);
module.exports=router;