const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");

const optgenerator = require("otp-generator");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
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
    const existUser=await User.findOne({Email:Email});
    console.log("existUser",existUser)
    if(existUser){

        if(existUser.Email===Email)return res.status(400).json({
            message:"Already user Exist with this email"
        })
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password not matching",
      });
    }
    const recentOtp = await OTP.find({ email: Email })
      .sort({ createAt: -1 })
      .limit(1);
    console.log("recentOtp-->", recentOtp.length, otp);
    if (recentOtp[0] === 0 || recentOtp.length===0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
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
      role,
      Profile: userProfile._id,
      ProfilePicture: `https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`,
      
    });
    console.log(userDB);
    return res.status(200).json({
      success: true,
      message: "Successfully user Created in DataBase",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating User DB",
    });
  }
};

//OTP handler

exports.otp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ Email: email });
    if (user) {
      return console.log("Already User registered with this Email");
    }

    const generatedOtp = optgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const OTPmodel = await OTP.create({ email, OTP: generatedOtp });
    console.log(OTPmodel);
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
        message: "User not registered With this Email",
      });
    }

    const payload = {
      email: registredUser.Email,
      role: registredUser.role,
      id: registredUser._id,
    };
    if (await bcrypt.compare(password, registredUser.Password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2hr",
      });
      const option = {
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
        secure:true
    }
      res.cookie("ViToken", token, option).status(200).json({
        success: true,
        registredUser,
        token,
        message: "Successfully Logged in",
      });
    }
    else{
        return res.status(403).json(
            {
                success: false,
                message: "Password Incorrect"
            }
        )
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging",
    });
  }
    
};
exports.changePassword = async (req, res) => {
  try {
    const { oldpassword, password, ConfirmPassword } = req.body;
  } catch (error) {}
};
