const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const tokenVerify = require('../middleware/authMiddleware')

router.post('/register', authController.userRegistration)
router.post('/login', authController.userLogin)
router.put('/update', tokenVerify, authController.UpdatePassword)

module.exports = router