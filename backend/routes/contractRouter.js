const express = require('express')
const router = express.Router()

const { newContract, getContracts, deleteContract } = require('../controllers/contractController')
const requireAuth = require('../middlewares/requireAuth')

router.get('/', requireAuth, getContracts)
router.post('/create', requireAuth, newContract)
router.delete('/:id', requireAuth, deleteContract)

module.exports = router