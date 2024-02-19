import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Todo App
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Organize Your Tasks and Boost Your Productivity
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Welcome to the Todo App!
          </h2>
          <p className="text-gray-700 mb-4">
            Streamline your life with our minimalist Todo App. Whether it's work,
            personal, or health-related tasks, we've got you covered.
          </p>
          <p className="text-gray-700 mb-8">
            Start managing your tasks today and experience the elegance of a
            well-organized schedule.
          </p>
          <Link
            to="/tasks"
            className="bg-gray-900 text-white px-6 py-3 rounded-full inline-block shadow-md transition duration-300 hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home