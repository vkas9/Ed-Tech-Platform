const app=require('express');
const router=app.Router();
const {createCatagory,getAllCatagory}=require("../controllers/CatagoryCT");
const {isAdmin,auth,isInstructor, isStudent}=require("../middlewares/middlewareAuth");
const {createCourse,getAllCourseDetail}=require("../controllers/CourseCT");
const {createSection}=require("../controllers/SectionCT");
const{createSubSection}=require("../controllers/Sub-SectionCT");
const {createRating}=require("../controllers/RatingReviewCT");
router.post("/createCatagory",auth,isAdmin,createCatagory);
router.get("/getAllCatagory",auth,isAdmin,getAllCatagory);
router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourseDetail",auth,isInstructor,getAllCourseDetail);
router.post("/createSection",auth,isInstructor,createSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);

router.post("/createRating",auth,isStudent,createRating);
module.exports=router;