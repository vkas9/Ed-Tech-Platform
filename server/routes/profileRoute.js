const app=require('express');
const router=app.Router();


const{deleteAccount}=require("../controllers/ProfileCT");
const {isAdmin,auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);

module.exports=router;