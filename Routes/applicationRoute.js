const express=require("express");
const router=express.Router();
const applicationController=require("../Controller/applicationController");
router.get("/",applicationController.getAllApplications);
router.post("/",applicationController.createApplication);
router.get("/approve",applicationController.approveApplication);
router.get("/reject",applicationController.rejectApplication);
module.exports=router;