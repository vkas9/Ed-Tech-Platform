const app = require("express");
const router = app.Router();
const { createCatagory, getAllCatagory } = require("../controllers/CatagoryCT");
const {
  auth,
  isInstructor,
  isStudent,
} = require("../middlewares/middlewareAuth");
const {
  createCourse,
  getAllCourseDetail,
  updateCourse,
  getAllCourse,
  getWishlistDetails,
  updateWishlistDetails,
  deleteWishlistDetails,
  editCourseDetails,
  deleteEnrolledCourse,
  deleteInstructorCourse,
} = require("../controllers/CourseCT");
const {
  createSection,
  deleteSection,
  updateSection,
} = require("../controllers/SectionCT");
const {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} = require("../controllers/Sub-SectionCT");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingReviewCT");

router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/editCourseDetails", auth, isInstructor, editCourseDetails);
router.post("/updateCourse", auth, isInstructor, updateCourse);
router.get("/getAllCourse", getAllCourse);
router.get("/getAllCatagory", getAllCatagory);
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourseDetail", auth, isInstructor, getAllCourseDetail);
router.post("/createSection", auth, isInstructor, createSection);

router.post("/updateWishlistDetails", auth, updateWishlistDetails);
router.get("/getWishlistDetails", auth, getWishlistDetails);
router.post("/deleteWishlistDetails", auth, deleteWishlistDetails);
router.post("/deleteEnrolledCourse", auth, deleteEnrolledCourse);
router.post(
  "/deleteInstructorCourse",
  auth,
  isInstructor,
  deleteInstructorCourse
);
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);
module.exports = router;
