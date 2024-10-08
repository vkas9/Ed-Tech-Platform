const section=require("../models/Section");
const subSection=require("../models/Sub-Section");
const { uploadDigital}=require("../utils/fileUploader");
const course=require("../models/Courses");
const { encryptData } = require("../utils/crypto-server");
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
       const VideoFile= await uploadDigital(video.tempFilePath)
        
        if(!VideoFile ){
            throw new Error("Failed to upload video");
        }
       
        
        const videoDuration=VideoFile.duration?Math.ceil(VideoFile.duration).toString():"0";
        const subSectionObject=await subSection.create({title,description,videoURL:VideoFile.publicUrl,duration:videoDuration});
        await section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionObject._id}},{new:true});
        const updatedCourse = await course.findById(courseId)
		.populate({
			path:"Section",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        const encryptCreateSubSection=encryptData(updatedCourse)
        res.status(200).json({
            success:true,
            message:"Successfully created Sub-section",
            updatedCourse:encryptCreateSubSection
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
       
        const {title,description,sectionId,subSectionId,courseId}=req.body;
        const video=req.files?.video
        console.log("title,description,sectionId,subSectionId",title,description,sectionId,subSectionId)
        
        const subSectionDetail=await subSection.findById(subSectionId);

        if (title !== undefined) {
            subSectionDetail.title=title;
          }
          if (description !== undefined) {
            subSectionDetail.description=description;
          }
          
         if (video) {
            const VideoFile=await uploadDigital(video.tempFilePath)
            
            console.log("VideoFile->",VideoFile)
            if(!VideoFile){
                throw new Error("Failed to upload video");
            }
            const videoDuration=VideoFile.duration?Math.ceil(VideoFile.duration).toString():"0";
            subSectionDetail.duration=videoDuration
            subSectionDetail.videoURL=VideoFile.publicUrl
        }
        
        
        
       
        await subSectionDetail.save();
        const updatedCourse=await course.findById(courseId)
        .populate({
          path: "Instructor",
          populate: {
            path: "Profile",
          },
        })
        .populate({
          path: "Rating_N_Reviews",
          populate: {
            path: "User",
          },
        })
        .populate({
          path: "Catagory",
          populate: {
            path: "Course",
          },
        })
        .populate("StudentEntrolled")
        .populate("Section")
        .populate({
          path: "Section",
          populate: {
            path: "subSection",
          },
        })
        .exec()
        const encryptUpdateSubSection=encryptData(updatedCourse)
        res.status(200).json({
            success:true,
            message:"Successfully updated Sub-section",
            updatedCourse:encryptUpdateSubSection
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
        const encryptDeleteSubSection=encryptData(updatedCourse)
        res.status(200).json({
            success:true,
            message:"Successfully Sub Section Deleted",
            updatedCourse:encryptDeleteSubSection
            

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while deleting Sub Section"
        })
        
    }
}