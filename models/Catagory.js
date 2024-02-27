const mongoose = require("mongoose");


const CatagorySchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }

})
module.exports = mongoose.model("Catagory", TagSchema);