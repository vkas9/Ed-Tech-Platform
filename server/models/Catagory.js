const mongoose = require("mongoose");


const CatagorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link:{
        type:String,
        require:true
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }

})
module.exports = mongoose.model("Catagory", CatagorySchema);