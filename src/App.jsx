import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import ChangePassword from './pages/Changepassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App