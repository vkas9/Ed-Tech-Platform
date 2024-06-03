const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");

const optgenerator = require("otp-generator");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
require("dotenv").config();
//sign up handler
exports.signup = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Contact_Number,
      Password,
      ConfirmPassword,
      otp,
      role,
    } = req.body;

    if (!FirstName || !LastName || !Email || !Password || !Password || !otp) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existUser = await User.findOne({ Email: Email });
    console.log("existUser", existUser);
    if (existUser) {
      if (existUser.Email === Email)
        return res.status(400).json({
          message: "Already user Exist with this email",
        });
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm password not matching",
      });
    }
    const recentOtp = await OTP.find({ email: Email })
      .sort({ createAt: -1 })
      .limit(1);
    console.log("recentOtp-->", recentOtp);
    if (recentOtp[0] === 0 || recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    } else if (recentOtp[0].OTP !== otp) {
      return res.status(400).json({
        success: false,

        message: "OTP not Matching",
      });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const userProfile = await Profile.create({
      City: null,
      contactNumber: null,
      Country: null,
      Gender: null,
      about: null,
      dateOfBirth: null,
    });
    //creating entry in DB

    const userDB = await User.create({
      FirstName,
      LastName,
      Password: hashedPassword,
      Email,
      Contact_Number,
      role:"Student",
      Profile: userProfile._id,
      avatar: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${FirstName}`,
    });
    console.log("userDB", userDB);
    return res.status(200).json({
      success: true,
      message: "Successfully Account Created",
      userData: userDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating Account",
    });
  }
};

//OTP handler

exports.otp = async (req, res) => {
  try {
    console.log("get otp");
    const { email } = req.body;

    const user = await User.findOne({ Email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Already User registered with this Email",
      });
    }

    const generatedOtp = optgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const OTPmodel = await OTP.create({ email, OTP: generatedOtp });
   
    res.status(200).json({
      success: true,
      message: "Successfully OTP send",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while OTP Generating",
    });
  }
};

const generateAccessAndRefreshToken=async(userId)=>{
  const user=await User.findById(userId);
  const accessToken=user.generateAccessToken();
  const refreshToken=user.generateRefreshToken();
  user.refreshToken=refreshToken;
  await user.save({validationBeforeSave:false});
  return {accessToken,refreshToken};

}

//log in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all Details",
      });
    }
    const registredUser = await User.findOne({ Email: email });
    if (!registredUser) {
      return res.status(401).json({
        success: false,
        message: "User not registered with this Email",
      });
    }

    
    if (await bcrypt.compare(password, registredUser.Password)) {
      const {accessToken,refreshToken}=await generateAccessAndRefreshToken(registredUser._id)
      const options = {
        httpOnly: true,
        secure: true,
        sameSite:'None',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      };
      res.cookie("__EDTat", accessToken, options).cookie("__EDTrt",refreshToken,options).status(200).json({
        success: true,
        registredUser,
        token:accessToken,
        refreshToken,
        message: "Successfully Logged in",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging",
    });
  }
};

exports.refreshAccessToken=async(req,res)=>{
  try {
    const token=req.cookies.__EDTrt||req.body.__EDTrt;
    console.log("refreshToken->",token);
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Unauthorized Request"
      })
    }
    const decodedToken=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    const user=await User.findById(decodedToken?.id);
    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid Refresh Token"
      })
    }
    if(token!==user?.refreshToken){
      return res.status(401).json({
        success:false,
        message:"Refresh Token has Expired or Used"
      })
    }
    const options={
      httpOnly:true,
      secure:true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
    const{refreshToken:newRefreshToken,accessToken:newAccessToken}=generateAccessAndRefreshToken(decodedToken?._id);
    res.status(200).cookie("newRefreshToken",newRefreshToken,options).cookie("newAccessToken",newAccessToken,options).json({
      success:true,
      token:newAccessToken,
      refreshToken:newRefreshToken


    })



  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess:false,
      message:""
    })
    
  }
}
// change password
exports.changePassword = async (req, res) => {
  try {
    const { oldpassword, password, ConfirmPassword } = req.body;
    console.log(req.body);
    if (password !== ConfirmPassword)
      return res.status(400).json({
        success: false,
        message: "Password do not matching!",
      });
    const registredUser = await User.findById(req.user.id );
    const isOldPasswordCorrect = await bcrypt.compare(
      oldpassword,
      registredUser.Password
    );
    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }
    const newPassHash = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { Password: newPassHash },
      { new: true }
    );
    await sendMail(registredUser.Email,"Password Update","Password updated successfully")

    return res.status(200).json({
      success:true,
      message: "Password successfully Changed",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing password"
    });
  }
};

exports.verifyForgotPasswordOTP=async(req,res)=>{
  try {
   const{otp,email}=req.body;
   console.log("opt",otp," email->",email)
    const recentOtp = await OTP.find({ email })
      .sort({ createAt: -1 })
      .limit(1);
    console.log("recentOtp-->", recentOtp);
    if (recentOtp[0] === 0 || recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    } else if (recentOtp[0].OTP !== otp) {
      return res.status(400).json({
        success: false,

        message: "OTP not Matching",
      });
    }
    res.status(200).json({
      success:true,
      message:"Email Verified!"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Failed to Verify OTP"
    })
  }
}
exports.resetPassword = async (req, res) => {
  try {
    const {password, ConfirmPassword,email } = req.body;
    if (!email || !password || !ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and confirm password are required",
      });
    }
    const registredUser = await User.findOne({Email:email} );
   
    if(!registredUser){
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }
    if (password !== ConfirmPassword){
      return res.status(400).json({
        success: false,
        message: "Password do not matching!",
      });
    }
    
    const newPassHash = await bcrypt.hash(password, 10);
  
    const updatedUser = await User.findOneAndUpdate(
      {Email:email},
      { Password: newPassHash },
      { new: true }
    );
   
    await sendMail(email,"Password Reset ","Password Reset successfully")

    return res.status(200).json({
      success:true,
      message: "Password successfully Reset!",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing password"
    });
  }
};

exports.forgotPasswordOTP=async (req, res) => {
  try {
    const { email } = req.body;
    const generatedOtp = optgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
   await OTP.create({ email, OTP: generatedOtp });
   
    res.status(200).json({
      success: true,
      message: "Successfully OTP send",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while OTP Generating",
    });
  }
};

//user log out

exports.userLogOut=async(_,res)=>{
  try {
    // const userId=req.user.id;
    // await User.findByIdAndUpdate(userId, {
    //     refreshToken: ""
      
    // }, { new: true });
    const options = {
      httpOnly: true,
      secure: true,
      sameSite:'None'
    };
    return res.status(200).clearCookie("__EDTat",options).clearCookie("__EDTrt",options).json({
      success:true,
      message:"Successfully Logged Out"
    })

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  
  }
}