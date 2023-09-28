const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contractSchema = new Schema({
    ref: { type: String, required: true },
    budget: { type: String, required: true },
    title: { type: String, required: true },
    fee: { type: String, required: true },
    deadline: { type: String, required: true },
    file: { type: String, required: true },
}, {timestamps: true})

module.exports = mongoose.model('contract', contractSchema)