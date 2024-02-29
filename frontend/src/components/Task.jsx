import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Task = ({task, getTasks}) => {
  //! Time
  const start = new Date(`01/01/2022 ${task.startTime}`);
  const end = new Date(`01/01/2022 ${task.endTime}`);
  const difference = end - start;
  const hours = Math.floor(difference / 3600000);
  const remainingMinutes = Math.floor((difference % 3600000) / 60000);
  let formattedDifference = '';
  if (hours > 0) {
    formattedDifference += `${hours}h `;
  }
  formattedDifference += `${remainingMinutes}min`;
  //! Handle Complete
  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`);
      toast.success('The Status has been updated')
      getTasks()
    } catch (error) {
      toast.error('Error updating task:', error);
    }
  }
  const handleDelete = async (id) => {
    console.log(id);
    if (!task.status) {
      const request = window.confirm('Are you sure that you want to delete this task?');
      if (request) {
        try {
          await axios.delete(`http://localhost:3000/api/tasks/${id}`);
          toast.success('The Task has been deleted')
          getTasks()
        } catch (error) {
          toast.error('Error deleting task:', error);
        }
      }
    } else {
      try {
        await axios.delete(`http://localhost:3000/api/tasks/${id}`);
        toast.success('The Task has been deleted')
        getTasks()
      } catch (error) {
        toast.error('Error deleting task:', error);
      }
    }

  }
  return (
    <div className="border-b-2 border-gray-200 py-4">
      <h2 className={` text-xl font-semibold mb-2 text-gray-800 ${task.status && 'line-through'}`}>{task.taskName}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className='font-bold underline'>Description:</span> {task.description}</p>
      <p className="text-sm text-gray-600 mb-1"><span className='font-bold underline'>Due date:</span> {task.dueDate}</p>
      <p className="text-sm text-gray-600 mb-1"><span className='font-bold underline'>Status:</span> {task.status ? 'Completed' : 'Incompleted'}</p>
      <p className="text-sm text-gray-600 mb-4"><span className='font-bold underline'>Time:</span> {formattedDifference}</p>
      <div className="flex justify-between items-center">
        <button onClick={()=>handleComplete(task._id)} className="text-sm text-gray-800 py-1 px-3 rounded-full bg-green-500 hover:bg-green-600">Complete</button>
        <button onClick={()=>handleDelete(task._id)} className="text-sm text-white py-1 px-3 rounded-full bg-red-500 hover:bg-red-600">Delete</button>
      </div>
    </div>
  )
}

export default Task