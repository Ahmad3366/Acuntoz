const Company = require('../models/Company')

const newCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body)
        res.json(company)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    newCompany
}