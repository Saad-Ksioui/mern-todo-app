const express = require('express')
const Task = require('../Models/taskModel')
const { getTasks, getTask, createTask, updateStatus, deleteTask } = require('../Controllers/taskController')


const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/create', createTask)
router.put('/:id', updateStatus)
router.delete('/:id', deleteTask)

module.exports = router