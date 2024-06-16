const section=require("../models/Section");
const course=require("../models/Courses");
const { encryptData } = require("../utils/crypto-server");
exports.createSection=async(req,res)=>{
    try {
        const {sectionName,courseId}=req.body;
        console.log("section->",sectionName,courseId)
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of Section"
            })
        }
        
        const newSection=await section.create({SectionName:sectionName});
        const updatedCourse=await course.findByIdAndUpdate(courseId,{$push:{Section:newSection._id}},{new:true}).populate({
            path: "Section",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        const encryptCreateSection=encryptData(updatedCourse)
        res.status(200).json({
            success:true,
            message:"Successfully created Section",
            uCourse:encryptCreateSection
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating Section"
        })
    }
}

exports.updateSection=async(req,res)=>{
    try {
        const {sectionName,sectionId,courseId}=req.body;
        const updatedSection=await section.findByIdAndUpdate(sectionId,{SectionName:sectionName},{new:true});
        const updatedCourse = await course.findById(courseId)
		.populate({
			path:"Section",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        const encryptUpdateSection=encryptData(updatedCourse)
        res.status(200).json({
            success:true,
            message:"Successfully updated Section",
            upCourse:encryptUpdateSection
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong while upading Section"
        })
    }
}
exports.deleteSection=async(req,res)=>{
    try {
        const {sectionId,courseId}=req.body;
        const updateSection=await section.findByIdAndDelete(sectionId);
        const updateCourse=await course.findByIdAndUpdate(courseId,{$pull:{Section:sectionId}},{new:true}).populate({
            path: "Section",
            populate: {
                path: "subSection",
            },
        })
        .exec();
       
        if (!updateSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found or already deleted."
            });
        }

        if (!updateCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }
        const encryptDeleteSection=encryptData(updateCourse)
        res.status(200).json({
            success:true,
            message:"Successfully Delete Section",
            updateCourse:encryptDeleteSection
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong while Deleting Section",
            error:error
        })
    }
}

