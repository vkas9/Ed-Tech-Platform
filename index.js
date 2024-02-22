const express=require("express");
const app=express();
require("dotenv").config();
app.listen(8080,()=>{
    console.log("Server Started at Port no. 8080")
})