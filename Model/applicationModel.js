const mongoose = require('mongoose');

const applicationModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    imageData: {
        type: String,
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobModel'
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
});

module.exports = mongoose.model('applicationModel', applicationModel);