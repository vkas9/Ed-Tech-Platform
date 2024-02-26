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
        await section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionObject._id}},{new:true});
        res.status(200).json({
            success:true,
            message:"Successfully created Sub-section"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Sub-section"
        })
    }
}
exports.updateSubSection=async(req,res)=>{
    try {
       
        const {title,timeDuration,description,sectionId,subSectionId}=req.body;
        const video=req.files.videoFile
        if(!title||!timeDuration||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of subSection"
            })
        }
        const subSectionDetail=await subSection.findById(subSectionId);
        subSectionDetail.title=title;
        subSectionDetail.timeDuration=timeDuration;
        subSectionDetail.description=description;
        subSectionDetail.videoURL=video.secure_url;
        await section.save(subSectionDetail);
        res.status(200).json({
            success:true,
            message:"Successfully updated Sub-section"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating Sub-section"
        })
    }
}


//todo deleting subsection