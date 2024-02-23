const nodemailer = require("nodemailer");

const optGenerator = require("opt-generator");
require("dotenv").config();
const sendMail = async (email, title, otp) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })
        const otp = optGenerator.generate(6, { uppperCaseAphabets: false, digits: true })
        let info = await transporter.sendMail({
            from: "VV-Vikas",
            to:`${email}`,
            subject:"Otp from Ed Tech Platform",
            html:  `<h1>OTP - ${otp}</h1>`
        })
        console.log(info)
    } catch (error) {
        console.log("There is a error in sending Mail",error);
        
    }



}