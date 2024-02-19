const express=require("express");
const router=express.Router();
const jobController=require("../Controller/jobController");
router.get("/",jobController.getAllJobs);
router.post("/",jobController.createJob);
router.delete("/:id",jobController.deleteJob);
module.exports=router;