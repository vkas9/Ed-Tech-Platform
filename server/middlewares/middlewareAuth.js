//auth

const user=require("../models/User");
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.auth=async(req,res,next)=>{
    try {
        const token=req.cookies.ViToken ||req.body.token;
        console.log("token-->",token);
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing"
            })
        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode->",decode);
            req.user=decode;
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifing auth/jwt",
            error:error
        })
    }
}
//isStudent
exports.isStudent=async(req,res,next)=>{
    try {
        
        if(req.user.role!=="Student"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Student"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while checking Student route"
        })
    }
}

//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try {
        const {role}=req.user;
       
        if(role!=="Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while checking Intructor route"
        })
    }
}


//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try {
        const {role}=req.user;
        console.log("role",role)
       
        if(role!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while checking Admin route"
        })
    }
}


