const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const tokenVerify = require('../middleware/authMiddleware')

router.post('/create', tokenVerify, taskController.createTask)
router.get('/taskId/:id', taskController.getTaskById)
router.put('/edit/:id', tokenVerify, taskController.updateTask)
router.delete('/delete/:id', tokenVerify, taskController.deleteTask)
router.get('/alltask', tokenVerify, taskController.getAllTasks)

module.exports = router