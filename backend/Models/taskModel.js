const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    taskName : {
      type: String,
      required: [true,'A task must have a name']
    },
    description : {
      type: String
    },
    dueDate : {
      type: String,
      required: [true, 'Please provide the date by when this task is due.'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide the start time of the task']
    },
    endTime: {
        type: String,
        required: [true, 'Please provide the end time of the task']
    },
    status : {
      type: Boolean,
      default: false
    },
    user_id: {
      type: String,
      required: true
    }
  },  { timestamps: true }
)

const Task = mongoose.model('Tasks', taskSchema)

module.exports = Task