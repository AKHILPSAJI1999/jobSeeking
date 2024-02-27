const jobModel = require("../Model/jobModel");
const applicationModel = require("../Model/applicationModel");
const email = require("./email");
const jwt = require('jsonwebtoken');
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched job Details",
      data: jobs
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.getJobById = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id);
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched job Details",
      data: job
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.getJobsByEmail = async (req, res) => {
  try {
    const job = await jobModel.find({ createdBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email });
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched job Details",
      data: job
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.createJob = async (req, res) => {
  try {
    const existTitle = await jobModel.find({ title: req.body.title });
    if (existTitle.length === 0) {
      const newJob = new jobModel({
        title: req.body.title,
        category: req.body.category,
        country: req.body.country,
        city: req.body.city,
        location: req.body.location,
        description: req.body.description,
        salary: req.body.salary,
        createdBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email,
        updatedBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email
      })
      const savedJob = await newJob.save();
      const result = email.sendEmail(jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email, `POSTED A NEW JOB : ${req.body.title}`, `<html>
          <head>
          <style>
          table, th, td {
            border: 1px solid black;
          }
          th, td {
              padding: 10px;
            }
          </style>
          </head>
          <body><h3>Hey Admin, this is to inform you that you have just submitted a new job in jobSeeking application</h3>
          <h4>Here is the whole detail of the job</h4>
          <table style="width:400px">
          <tr>
            <th>Title</th>
            <td>${req.body.title}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>${req.body.category}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>${req.body.country}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>${req.body.city}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>${req.body.location}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>${req.body.description}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>${req.body.salary}</td>
          </tr>
        </table></body>
        </html>`);
      res.status(200).json({
        statusCode: 200,
        message: "Successfully saved the job details",
        data: savedJob
      })
    }
    else {
      res.status(500).json({
        statusCode: 500,
        message: "Job Already Exist Please Enter different Job",
        data: null
      })
    }
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.updateJobById = async (req, res) => {
  try {
    const updatedJob = {
      title: req.body.title,
      category: req.body.category,
      country: req.body.country,
      city: req.body.city,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      createdBy: req.body.createdBy,
      updatedBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email
    }
    const job = await jobModel.findByIdAndUpdate(req.params.id, updatedJob, { new: true });
    const result = email.sendEmail(req.body.createdBy, `UPDATED THE JOB : ${req.body.title}`, `<html>
          <head>
          <style>
          table, th, td {
            border: 1px solid black;
          }
          th, td {
              padding: 10px;
            }
          </style>
          </head>
          <body><h3>Hey Admin, this is to inform you that you have just updated JOB : ${req.body.title} in jobSeeking application</h3>
          <h4>Here is the updated detail of the job</h4>
          <table style="width:400px">
          <tr>
            <th>Title</th>
            <td>${req.body.title}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>${req.body.category}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>${req.body.country}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>${req.body.city}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>${req.body.location}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>${req.body.description}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>${req.body.salary}</td>
          </tr>
        </table></body>
        </html>`);
    res.status(200).json({
      statusCode: 200,
      message: "Successfully updated the job details",
      data: job
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.deleteJob = async (req, res) => {
  try {
    const job=await jobModel.findById(req.params.id);
    const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
    const applications=await applicationModel.find({jobId:req.params.id});
    for (const application of applications){
      await applicationModel.findByIdAndDelete(application._id);
    }
    const result = email.sendEmail(job.createdBy, `DELETED THE JOB : ${job.title}`, `<html>
          <head>
          <style>
          table, th, td {
            border: 1px solid black;
          }
          th, td {
              padding: 10px;
            }
          </style>
          </head>
          <body><h3>Hey Admin, this is to inform you that you have just deleted JOB : ${job.title} in jobSeeking application</h3>
          <h4>Here is the detail of the deleted job</h4>
          <table style="width:400px">
          <tr>
            <th>Title</th>
            <td>${job.title}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>${job.category}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>${job.country}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>${job.city}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>${job.location}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>${job.description}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>${job.salary}</td>
          </tr>
        </table></body>
        </html>`);
    res.status(200).json({
      statusCode: 200,
      message: "Successfully deleted the job Detail",
      data: deletedJob
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}