const jobModel=require("../Model/jobModel");
exports.getAllJobs=async(req,res)=>{
    try{
        const jobs=await jobModel.find();
        res.status(200).json({
            statusCode:200,
            message:"Success",
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