const Task = require('../Models/taskModel')
const asyncHandler = require('express-async-handler')

// GET all tasks
const getTasks = asyncHandler(async (req, res) => {
  try {
    const {user_id} = req.params
    const tasks = await Task.find({user_id: user_id});
    res.status(200).json(tasks);
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
})
// GET a single task by ID
const getTask = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).send('Internal Server Error');
  }
})
// Create a new task
const createTask = asyncHandler(async (req, res) => {
  try {
    const {taskName, description, dueDate, startTime, endTime, user_id} = req.body
    const result = await Task.create({taskName, description, dueDate, startTime, endTime, user_id});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Internal Server Error');
  }
})
// Update the status of an existing task
const updateStatus = asyncHandler(async (req, res) => {
    try {
      const {id} = req.params
      const result = await Task.findByIdAndUpdate({ _id: id },{status: true});
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).send('Internal Server Error');
    }
})
// update a task
const updateTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }
  res.status(200).json(task)
}
// DELETE a task
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params
    const result = await Task.findByIdAndDelete({_id: id});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
})

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateStatus,
  updateTask,
  deleteTask
}