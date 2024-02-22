const mongoose = require("mongoose");
const { isString } = require("util");


const profileSchema = new mongoose.Schema({
    City:{
        type:String
    },
    contactNumber:{
        type:Number
    },
    Country:{
        type:String
    },
    Gender:{
        type:String
    },
    about:{
        type:isString
    }

})
module.exports=mongoose.model("Profiles",profileSchema);