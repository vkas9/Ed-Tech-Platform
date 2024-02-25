const cloudinary=require("cloudinary").v2;


exports.UploadImage=async(req,res)=>{
    try {
        const file=req.files.ImageFile;
        const supportedFileFormat=["jpg","jpeg","png"];
        const extention=file.name.split(".")[1].toLowerCase();
        if(!supportedFileFormat.includes(extention)){
            return console.log("This file format not supported");
        };
        await cloudinary.v2.uploader.upload(file.tempFilePath,{resource_type : "auto"})
        return res.status(200).json({
            success:true,
            message:"Successfully Uploaded to Cloudinary"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while uploading image to cloudinary"
        })
        
    }
}