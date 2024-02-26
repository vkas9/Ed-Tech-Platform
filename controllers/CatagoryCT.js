const catagory = require("../models/Catagory");

exports.createCatagory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return console.log("Please fill all detail")
        }
        await catagory.create({ Name: name, Description: description });
        res.status(200).json({
            success: true,
            message: "Successfully created Catagory"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating Catagory"
        })
    }
}

//get all catagory

exports.getAllCatagory = async (req, res) => {
    try {
        const allCatagory= await catagory.find({}, { Name: true, Description: true });
        res.status(200).json({
            success: true,
            allCatagory,
            message: "Successfully Received all catagory"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating catagory"
        })

    }
}