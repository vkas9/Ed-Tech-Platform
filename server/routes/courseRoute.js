const app = require("express");
const router = app.Router();
const { createCatagory, getAllCatagory } = require("../controllers/CatagoryCT");
const {
  isAdmin,
  auth,
  isInstructor,
  isStudent,
} = require("../middlewares/middlewareAuth");
const { createCourse, getAllCourseDetail, updateCourse,getAllCourse, getCartDetails, updateCartDetails, deleteCartDetails } = require("../controllers/CourseCT");
const { createSection, deleteSection, updateSection } = require("../controllers/SectionCT");
const { createSubSection, deleteSubSection,updateSubSection } = require("../controllers/Sub-SectionCT");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingReviewCT");
router.post("/createCatagory", auth, isAdmin, createCatagory);
router.get("/getAllCatagory", getAllCatagory);
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourseDetail", auth, isInstructor, getAllCourseDetail);
router.post("/createSection", auth, isInstructor, createSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);getCartDetails
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/updateCourse", auth, isInstructor, updateCourse);
router.get("/getAllCourse", auth, getAllCourse);
router.post("/updateCartDetails", auth, updateCartDetails);
router.get("/getCartDetails", auth, getCartDetails);
router.post("/deleteCartDetails", auth, deleteCartDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);
module.exports = router;
