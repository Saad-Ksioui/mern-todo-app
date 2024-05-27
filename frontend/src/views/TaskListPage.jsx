import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Task from '../components/Task'; // Adjust the path to your Task component

const TaskListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);


  const userId = localStorage.getItem('user').split(',')[1];

  const getTasks = async () => {
    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/api/tasks/all/${userId}`);
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center flex-col justify-center">
      <div className="max-w-4xl mt-5 mb-5 w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">Task List</h1>

        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {tasks.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {tasks.map((task, index) => (
                  <Task key={task._id} task={task} getTasks={getTasks} />
                ))}
              </div>
            ) : (
              <div className="mt-4 text-center">
                There are no tasks
              </div>
            )}
          </>
        )}

        <Link
          to="/tasks/create"
          className="block mt-6 text-center rounded-xl px-4 py-2 font-bold bg-gray-800 text-white hover:bg-gray-700"
        >
          Create a New Task
        </Link>
      </div>
    </div>
  );
};

export default TaskListPage;
