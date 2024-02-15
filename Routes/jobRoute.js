const express=require("express");
const router=express.Router();
const jobController=require("../Controller/jobController");
router.get("/",jobController.getAllJobs);
module.exports=router;