const email = require("./email");
const jobModel = require("../Model/jobModel");
const applicationModel = require("../Model/applicationModel");
const jwt = require('jsonwebtoken');
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await applicationModel.find({createdBy:jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email});
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched application Details",
      data: applications
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.createApplication = async (req, res) => {
  try {
    const file = req.files.file;
    const fileData = file.data.toString('base64');
    const jobApplied = await jobModel.findById(req.body.jobId);
    const applicationForm = new applicationModel({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      about: req.body.about,
      jobId: req.body.jobId,
      imageData: fileData,
      createdBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email,
      updatedBy: jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email,
      status: "Pending"
    });
    const attachments = [{
      filename: file.name,
      content: file.data
    }];
    const result = email.sendEmail(jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email, `APPLIED THE JOB : ${jobApplied.title}`, `<html>
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
          <body><h3>Hi ${req.body.name}, this is to inform you that you have just applied for a new job in jobSeeking application.</h3>
          <h3>An email has been send to the person who posted the job, after reviewing your resume he/she will approve/reject your application.</h3>
          <h4>Here is the whole detail of the application you just posted and also your resume is there in attachment in this email.</h4>
          <table style="width:400px">
          <tr>
            <th>Name</th>
            <td>${req.body.name}</td>
          </tr>
          <tr>
            <th>PhoneNumber</th>
            <td>${req.body.phoneNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>${req.body.address}</td>
          </tr>
          <tr>
            <th>About</th>
            <td>${req.body.about}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>${applicationForm.status}</td>
          </tr>
        </table></body>
        </html>`, attachments);
    const resultAdmin = email.sendEmail(jobApplied.createdBy, `APPROVE/REJECT THE APPLICATION`, `<html>
          <head>
          <style>
          table {
            width: 400px;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid black;
            padding: 10px;
          }
          th {
            text-align: left;
          }
            a.button {
                display: inline-block;
                padding: 10px 20px;
                margin-right: 10px;
                font-size: 16px;
                text-decoration: none;
                background-color: #007bff;
                color: #ffffff;
                border-radius: 5px;
              }
          </style>
          </head>
          <body><h3>Hey Admin, this is to inform you that a user has just submmited for an application of a job posted by you in jobSeeking application.</h3>
          <h3>Kindly go through the details of the application details along with the resume and click on approve or reject(Note; You can only approve/reject once, after once link won't work).</h3>
          <table style="width:400px">
          <tr>
            <th>Name</th>
            <td>${req.body.name}</td>
          </tr>
          <tr>
            <th>PhoneNumber</th>
            <td>${req.body.phoneNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>${req.body.address}</td>
          </tr>
          <tr>
            <th>About</th>
            <td>${req.body.about}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>${applicationForm.status}</td>
          </tr>
        </table>
        <a href="${process.env.APPROUTER_URL}/application/approve?appId=${applicationForm._id}" class="button" id="approveBtn">Approve</a>
        <a href="${process.env.APPROUTER_URL}/application/reject?appId=${applicationForm._id}" class="button" id="rejectBtn">Reject</a>
        </body>
        </html>`, attachments);
    const savedapplicationForm = await applicationForm.save();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched job Details",
      data: savedapplicationForm
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.approveApplication = async (req, res) => {
  try {
    const application = await applicationModel.findById(req.query.appId).populate('jobId');
    if (jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email === application.jobId.createdBy) {
      if (application.status === 'Pending') {
        application.status = 'Approved';
        const savedUpdatedApplication = await applicationModel.findByIdAndUpdate(application._id, application, { new: true });
        const message = "<h1>Thank you for approving the request Admin.The email has been sent to the applicant.</h1>";
        const result = email.sendEmail(application.createdBy, `APPLICATION ACCEPTED`, `<html>
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
          <body><h3>Hi ${application.name}, this is to inform you that the job ${application.jobId.title} you applied for has been approved. So congratulations on your job.</h3>
          <h3>Have a Great Day</h3>
          </body>
        </html>`);
        res.status(200).send(message);
      }
      else {
        const message = "<h1>Sorry Admin but this application has already been Approved/Rejected by you</h1>";
        res.status(200).send(message);
      }
    }
    else {
      const message = "<h1>Sorry but you don't have access for this URL</h1>";
      res.status(200).send(message);
    }
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.rejectApplication = async (req, res) => {
  try {
    const application = await applicationModel.findById(req.query.appId).populate('jobId');
    if (jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email === application.jobId.createdBy) {
      if (application.status === 'Pending') {
        application.status = 'Rejected';
        const savedUpdatedApplication = await applicationModel.findByIdAndUpdate(application._id, application, { new: true });
        const message = "<h1>Thank you for rejecting the request Admin.The email has been sent to the applicant.</h1>";
        const result = email.sendEmail(application.createdBy, `APPLICATION REJECTED`, `<html>
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
          <body><h3>Hi ${application.name}, this is to inform you that unfortuantely the job ${application.jobId.title} you applied for has been rejected. You can apply later for this job with updated resume later.</h3>
          <h3>Have a Great Day</h3>
          </body>
        </html>`);
        res.status(200).send(message);
      }
      else {
        const message = "<h1>Sorry Admin but this application has already been Approved/Rejected by you</h1>";
        res.status(200).send(message);
      }
    }
    else {
      const message = "<h1>Sorry but you don't have access for this URL</h1>";
      res.status(200).send(message);
    }
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.getApplicationsByJobEmail = async (req, res) => {
  try {
    const applications = await applicationModel.find().populate({
      path: 'jobId',
      match: {createdBy:jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload?.email}
    });
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched application Details",
      data: applications
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}
exports.deleteApplication = async (req, res) => {
  try {
    const applications = await applicationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched application Details",
      data: applications
    })
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
      data: null
    })
  }
}