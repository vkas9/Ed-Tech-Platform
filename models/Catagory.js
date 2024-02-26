const mongoose = require("mongoose");


const CatagorySchema = new mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }

})
module.exports=mongoose.model("Catagory",TagSchema);