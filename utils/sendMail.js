const nodemailer = require("nodemailer");


require("dotenv").config();
const sendMail = async (email, title, body) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "vikas.vishwakarma.cse@adgitmdelhi.ac.in",
                pass: "eqlgvrujjhlcqjyh"
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