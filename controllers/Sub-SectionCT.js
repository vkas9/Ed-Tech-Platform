const section=require("../models/Section");
const subSection=require("../models/Sub-Section");
const videoUpload=require("../utils/fileUploader");
exports.createSubSection=async(req,res)=>{
    try {
        const {title,timeDuration,description,sectionId}=req.body;
        const video=req.files.videoFile
        if(!title||!timeDuration||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of subSection"
            })
        }
        const VideoFile=await videoUpload(video,{folder: "VikasFolder",resource_type:"auto"});
        const subSectionObject=await subSection.create({title,timeDuration,description,videoURL:VideoFile.secure_url});
        await section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionObject._id}});
        res.status(200).json({
            success:true,
            message:"Successfully created Sub section"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating sub-section"
        })
    }
}