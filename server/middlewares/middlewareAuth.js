const user = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies?.mst_ac;
    console.log("token-->", token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Session Expired",
      });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("decodedToken->", decodedToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      if (error.name == "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Session Expired",
        });
      } else {
        return res.status(501).json({
          success: false,
          message: "Invalid Token",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifing auth/jwt",
      error: error,
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(400).json({
        success: false,
        message: "This is protected route for Student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while checking Student route",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "This is protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while checking Intructor route",
    });
  }
};
