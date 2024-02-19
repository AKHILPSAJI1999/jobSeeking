const jobModel=require("../Model/jobModel");
exports.getAllJobs=async(req,res)=>{
    try{
        const jobs=await jobModel.find();
        res.status(200).json({
            statusCode:200,
            message:"Successfully fetched job Details",
            data:jobs
        })
    }catch(e){
        res.status(500).json({
            statusCode:500,
            message:e.message,
            data:null
        })
    }
}
exports.createJob=async(req,res)=>{
    try{
        const newJob=new jobModel({
            title:req.body.title,
            category:req.body.category,
            country:req.body.country,
            city:req.body.city,
            location:req.body.location,
            description:req.body.description,
            salary:req.body.salary,
            createdBy:"akhil",
            updatedBy:"akhil"
        })
        const savedJob=await newJob.save();
        res.status(200).json({
            statusCode:200,
            message:"Successfully saved the job details",
            data:savedJob
        })
    }catch(e){
        res.status(500).json({
            statusCode:500,
            message:e.message,
            data:null
        })
    }
}
exports.deleteJob=async(req,res)=>{
    try{
        const deletedJob=await jobModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            statusCode:200,
            message:"Successfully deleted the job Detail",
            data:deletedJob
        })
    }catch(e){
        res.status(500).json({
            statusCode:500,
            message:e.message,
            data:null
        })
    }
}