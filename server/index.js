const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT||8080;
const courseRoute=require("./routes/courseRoute");
const paymentRoute=require("./routes/paymentRoute");
const profileRoute=require("./routes/profileRoute");
const userRoute=require("./routes/userRoute");




const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const fileUpload=require("express-fileupload");
const cors = require('cors');

app.use(cors({
  origin: ['https://master-ed-new.netlify.app', 'http://localhost:5173'], 
  credentials: true 
}));


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

const {dbConnect}=require("./config/connectDatabase");
dbConnect();
const {ConnectToCloudinary}=require("./config/cloudinaryConnect");
ConnectToCloudinary();

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/course",courseRoute);
// app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/profile",profileRoute);


app.get("/",(req,res)=>{
    res.send("Your server is up and running....")
})



app.listen(PORT,()=>{
    console.log(`Server Started at Port no. ${PORT}`)
    
})