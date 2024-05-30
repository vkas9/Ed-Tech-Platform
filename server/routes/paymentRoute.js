const express=require("express");
const { capturePayment, verifySignature } = require("../controllers/Payment");
const router=express.Router();
const{auth, isStudent}=require("../middlewares/middlewareAuth");
router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifySignature",verifySignature)

module.exports=router