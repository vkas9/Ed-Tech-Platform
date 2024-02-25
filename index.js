const express=require("express");
const app=express();
require("dotenv").config();

const {dbConnect}=require("./config/connectDatabase");
dbConnect();



app.listen(8080,()=>{
    console.log("Server Started at Port no. 8080")
})