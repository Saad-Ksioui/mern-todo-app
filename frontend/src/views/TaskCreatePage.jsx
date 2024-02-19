import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskCreatePage = () => {
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const submitToDB = async(e) => {
    e.preventDefault()
    if(taskName === '' || dueDate === '' || startTime === '' || endTime === ''){
      toast.error("Please fill all fields")
      return
    }
    try {
      setIsLoading(true)
      const response = await axios.post('http://localhost:3000/api/tasks/create',
      {taskName: taskName, description: description, dueDate: dueDate, startTime: startTime, endTime: endTime, status: false})
      toast.success(`Add ${response.data.taskName} successfully`)
      setIsLoading(false)
      navigate('/tasks')
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-black">
      <div className="max-w-md w-full my-5 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Create a New Task
        </h1>

        <form className="mb-8" onSubmit={submitToDB}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter task title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Description
            </label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter task description"

            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter start time"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter end time"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter due date"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-full inline-block shadow-md transition duration-300 hover:bg-gray-800"
            >
              Create Task
            </button>
          </div>
        </form>

        <Link
          to="/tasks" // Link to TaskList Page
          className="text-gray-700 hover:underline"
        >
          Go back to Task List
        </Link>
      </div>
    </div>
  );
};

export default TaskCreatePage;