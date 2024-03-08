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
        type:String
    },
    dateOfBirth:{
        type:String
    }

})
module.exports=mongoose.model("Profiles",profileSchema);