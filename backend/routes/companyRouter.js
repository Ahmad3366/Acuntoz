const express = require('express')
const router = express.Router()

const { newCompany } = require('../controllers/companiesController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.post('/newCompany', newCompany)

module.exports = router