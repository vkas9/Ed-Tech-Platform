const express=require("express");
const app=express();
require("dotenv").config();

const courseRoute=require("./routes/courseRoute");
const paymentRoute=require("./routes/paymentRoute");
const profileRoute=require("./routes/profileRoute");
const userRoute=require("./routes/userRoute");




const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const cors=require("cors");
const fileUpload=require("express-fileupload");


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

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
// app.use("/api/v1/profile",profileRoute);


app.get("/",(req,res)=>{
    res.send("Your server is up and running....")
})



app.listen(8080,()=>{
    console.log("Server Started at Port no. 8080")
})