const mongoose = require("mongoose");
const mailSender = require("../utils/sendMail");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "3m",
    required: true,
  },
  OTP: {
    type: String,
    required: true,
  }
});

const sendMail = async (email, otp) => {
  try {
    const mail = await mailSender(email, "Verification Email from MASTER", `Your OTP is: ${otp}`);
    console.log("Email Successful:", email);
  } catch (error) {
    console.log("Something went wrong while sending mail");
    console.log(error);
  }
};

OtpSchema.pre("save", async function(next) {
  console.log("This email:", this.email);
  await sendMail(this.email, this.OTP);
  next();
});

module.exports = mongoose.model("OTP", OtpSchema);
