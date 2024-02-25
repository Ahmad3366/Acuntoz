const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contractSchema = new Schema({
    tenderName: { type: String, required: true },
    tenderNumber: { type: String, required: true },
    tenderType: { type: String, required: true },
    siteLocation: { type: String, required: true },
    department: { type: String, required: true },
    tenderOwner: { type: String, required: true },
    tenderCategory: { type: String, required: true },
    formOfContract: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    projectDurationType: { type: String, required: true },
    dateOfIssue: { type: String, required: true },
    budgetType: { type: String, required: true },
    minimum: { type: String, required: true },
    maximum: { type: String, required: true },
    negotiable: { type: String, required: true },
    currency: { type: String, required: true },
    documentName: { type: String, required: true },
    documents: [{ type: String, required: true }]
}, { timestamps: true })

module.exports = mongoose.model('contract', contractSchema)