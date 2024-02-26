const cloudinary=require("cloudinary").v2;


exports.UploadImage=async(file,folder)=>{
    try {
        const option=folder
        // const supportedFileFormat=["jpg","jpeg","png"];
        // const extention=file.name.split(".")[1].toLowerCase();
        // if(!supportedFileFormat.includes(extention)){
        //     return console.log("This file format not supported");
        // };
        return await cloudinary.v2.uploader.upload(file.tempFilePath,option)
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while uploading image to cloudinary"
        })
        
    }
}