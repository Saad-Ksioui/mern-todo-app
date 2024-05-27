const express = require('express')
const Task = require('../Models/taskModel')
const { getTasks, getTask, createTask, updateStatus, deleteTask } = require('../Controllers/taskController')


const router = express.Router()

router.get('/all/:id', getTasks)
router.get('/one/:id', getTask)
router.post('/create', createTask)
router.put('/status/:id', updateStatus)
router.put('/:id', updateStatus)
router.delete('/:id', deleteTask)

module.exports = router