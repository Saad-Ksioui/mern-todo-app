import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskListPage from './views/TaskListPage';
import TaskCreatePage from './views/TaskCreatePage';
import Home from './views/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './views/auth/Login';
import Register from './views/auth/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tasks' element={<TaskListPage/>}/>
        <Route path='/tasks/create' element={<TaskCreatePage/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
