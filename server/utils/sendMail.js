const nodemailer = require("nodemailer");


require("dotenv").config();
const sendMail = async (email, title, body) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })
        
        let info = await transporter.sendMail({
            from: "VV-Vikas",
            to:`${email}`,
            subject:`${title}`,
            html:  `${body}`
        })
        console.log(info)
    } catch (error) {
        console.log("There is a error in sending Mail",error);
        
    }
}

module.exports=sendMail;