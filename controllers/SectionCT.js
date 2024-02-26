const section=require("../models/Section");
const course=require("../models/Courses")
exports.createSection=async(req,res)=>{
    try {
        const {sectionName,courseId}=req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please fill all detail of Section"
            })
        }
        const newSection=await section.create({SectionName:sectionName});
        await course.findByIdAndUpdate(courseId,{$push:{Section:newSection._id}},{new:true})
        await course.
        res.status(200).json({
            success:true,
            message:"Successfully created Section"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating Section"
        })
    }
}

exports.updateSection=async(req,res)=>{
    try {
        const {sectionName,sectionId}=req.body;
        await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        res.status(200).json({
            success:true,
            message:"Successfully updated Section"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while upading Section"
        })
    }
}
exports.deleteSection=async(req,res)=>{
    try {
        const {sectionId,courseId}=req.params;
        await section.findByIdAndDelete(sectionId,{new:true});
        await course.findOneAndUpdate(courseId,{$pull:{Section:sectionId}},{new:true});
        res.status(200).json({
            success:true,
            message:"Successfully Delete Section"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while Deleting Section"
        })
    }
}

