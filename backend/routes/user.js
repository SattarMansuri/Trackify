const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const tokenVerify = require('../middleware/authMiddleware')

router.post('/create', tokenVerify, userController.createUser)
router.put('/edit/:id', tokenVerify, userController.updateUser)
router.delete('/delete/:id', tokenVerify, userController.deleteUser)
router.get('/alltask', tokenVerify, userController.getAllUser)

module.exports = router