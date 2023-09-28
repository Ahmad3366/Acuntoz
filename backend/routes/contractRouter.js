const express = require('express')
const router = express.Router()

const { newContract, getContracts, deleteContract } = require('../controllers/contractController')
const requireAuth = require('../middlewares/requireAuth')

router.get('/getContracts', requireAuth, getContracts)
router.post('/newContract', requireAuth, newContract)
router.delete('/:id', requireAuth, deleteContract)

module.exports = router