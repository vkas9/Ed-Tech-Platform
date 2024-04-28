const app=require('express');
const router=app.Router();


const{deleteAccount,getAllUserDetails}=require("../controllers/ProfileCT");
const {isAdmin,auth,isInstructor,isStudent}=require("../middlewares/middlewareAuth");

router.delete("/deleteAccount",auth,isStudent,deleteAccount);
router.get("/getAllUserDetails",auth,getAllUserDetails);

module.exports=router;