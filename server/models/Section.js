const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({
    
    SectionName:{
        type:String,
        required:true
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        required:true
    }]

},{timestamps:true})
module.exports=mongoose.model("Section",sectionSchema);