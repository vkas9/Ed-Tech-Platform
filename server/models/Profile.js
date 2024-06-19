const mongoose = require("mongoose");
const { isString } = require("util");


const profileSchema = new mongoose.Schema({
    contactNumber:{
        type:Number
    },
    city:{
        type:String
    },
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    }

},{timestamps:true})
module.exports=mongoose.model("Profiles",profileSchema);