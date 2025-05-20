const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')
const tokenVerify = require('../middleware/authMiddleware')

router.post('/create', tokenVerify, projectController.createProject)
router.put('/edit/:id', tokenVerify, projectController.updateProject)
router.delete('/delete/:id', tokenVerify, projectController.deleteProject)
router.get('/alltask', tokenVerify, projectController.getAllProjects)

module.exports = router