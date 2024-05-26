const mongoose = require("mongoose");


const SubSectionSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    videoURL: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("SubSection", SubSectionSchema);