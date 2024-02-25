const tag = require("../models/Tags");

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return console.log("Please fill all detail")
        }
        await tag.create({ Name: name, Description: description });
        res.status(200).json({
            success: true,
            message: "Successfully created Tag"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating tags"
        })
    }
}

//get all tag

exports.getAllTag = async (req, res) => {
    try {
        const allTags = await tag.find({}, { Name: true, Description: true });
        res.status(200).json({
            success: true,
            allTags,
            message: "Successfully Received all tags"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating tags"
        })

    }
}