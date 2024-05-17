
const transporter=require("../config/EmailConfig")
require("dotenv").config();
const sendMail = async (email, title, body) => {
    try {
        
      await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to:`${email}`,
            subject:`${title}`,
            html:  `<h1>${body}</h1>`
        })
        
    } catch (error) {
        console.log("There is a error in sending Mail",error);
        
    }
}

module.exports=sendMail;