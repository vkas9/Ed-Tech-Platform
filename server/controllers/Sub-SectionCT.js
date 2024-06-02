const section=require("../models/Section");
const subSection=require("../models/Sub-Section");
const {UploadFile}=require("../utils/fileUploader");
const course=require("../models/Courses")
exports.createSubSection=async(req,res)=>{
    try {
        const {title,description,sectionId,courseId}=req.body;
        const video=req.files.videoFile
        if(!title||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of subSection"
            })
        }
        if(!video){
            return res.status(400).json({
                success:false,
                message:"Please Upload a video file"
            })
        }
        if (video.size > 100 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "Video file is too large"
            });
        }
        const VideoFile=await UploadFile(video.tempFilePath,{folder: "VikasFolder",resource_type:"auto"});
        if(!VideoFile ||!VideoFile.secure_url){
            throw new Error("Failed to upload video to Cloudinary");
        }
        const videoDuration=VideoFile.duration?Math.ceil(VideoFile.duration).toString():"0";
        const subSectionObject=await subSection.create({title,description,videoURL:VideoFile.secure_url,duration:videoDuration});
        await section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionObject._id}},{new:true});
        const updatedCourse = await course.findById(courseId)
		.populate({
			path:"Section",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        res.status(200).json({
            success:true,
            message:"Successfully created Sub-section",
            updatedCourse
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Sub-section",
           

        })
    }
}
exports.updateSubSection=async(req,res)=>{
    try {
       
        const {title,description,sectionId,subSectionId}=req.body;
        const video=req.files.videoFile
        if(!title||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of subSection"
            })
        }
        const subSectionDetail=await subSection.findById(subSectionId);
        subSectionDetail.title=title;
        
        subSectionDetail.description=description;
        subSectionDetail.videoURL=video.secure_url;
        await section.save({subSection:subSectionDetail});
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
exports.deleteSubSection=async(req,res)=>{
    try {
        const{sectionId,subSectionId,courseId}=req.body;
        const updatedSubSection=await  subSection.findByIdAndDelete(subSectionId,{new:true});
        const updatedSection=await section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});
        if(!updatedSection){
            return res.status(404).json({
                success:false,
                message:"Section not found or already deleted"
            })
        }
        if(!updatedSubSection){
            return res.status(404).json({
                success:"false",
                message:"Sub Section not found or already deleted"
            })
        }
        const updatedCourse=await course.findById(courseId).populate({
			path:"Section",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        res.status(200).json({
            success:true,
            message:"Successfully Sub Section Deleted",
            updatedCourse
            

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while deleting Sub Section"
        })
        
    }
}