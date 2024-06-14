const express=require("express");
const { createOrder, enrollCourse } = require("../controllers/Payment");
const router=express.Router();
const{auth, isStudent}=require("../middlewares/middlewareAuth");
router.post("/createOrder",auth,isStudent,createOrder)
router.post("/enrollCourse",auth,enrollCourse)

module.exports=router