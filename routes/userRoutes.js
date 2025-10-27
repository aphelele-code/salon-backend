const express = require('express')
const { signUp, logIn, authUser } = require('../controllers/userController')
const router = express.Router()
const {protect} = require('../Middleware/authMiddleware')
router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/auth',protect, authUser)

module.exports = router