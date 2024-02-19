import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskListPage from './views/TaskListPage';
import TaskCreatePage from './views/TaskCreatePage';
import Home from './views/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tasks' element={<TaskListPage/>}/>
        <Route path='/tasks/create' element={<TaskCreatePage/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
