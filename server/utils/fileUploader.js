const cloudinary=require("cloudinary");


exports.UploadFile=async(file,folder)=>{
    try {
        const option=folder

        console.log(option);
        console.log("file=>",file)
       
        return await cloudinary.v2.uploader.upload(file.tempFilePath,option)
        

    } catch (error) {
        return console.log("error",error)
        
    }
}



