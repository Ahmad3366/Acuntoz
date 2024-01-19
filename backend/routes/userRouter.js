const express = require('express')
const router = express.Router()

const { getUsers, loginUser, signupUser, verifyUser, updateUser, getUser, deleteUser } = require('../controllers/usersController')
const requireAuth = require('../middlewares/requireAuth')

router.get('/users', requireAuth, getUsers)

router.post('/login', loginUser)
router.post('/signup', requireAuth, signupUser)

router.get('/users/:id', requireAuth, getUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', requireAuth, deleteUser)

router.get('/:id/verify/:token', verifyUser)

module.exports = router
