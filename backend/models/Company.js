const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    business: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    companyRegistration: { type: String, required: true },
    licenseExp: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bankName: { type: String, required: true },
    beneficiary: { type: String, required: true },
    account: { type: String, required: true },
    corporate: { type: String, required: true },
    comments: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('company', CompanySchema)