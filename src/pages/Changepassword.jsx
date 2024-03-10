import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('username');
  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/change-password', { email, oldPassword, newPassword });
      console.log(response.data);
      toast("Password has been changed successfully.", {
        closeButton: false,
        autoClose: 3000
      });
      setTimeout(() => {
          navigate('/home');
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };


  return (
    <div className="min-h-screen bg-black-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10 relative">
          <div className="flex justify-center items-center">
            <img className="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          </div>
          <button onClick={() => navigate('/login')} className="text-indigo-600 hover:text-indigo-500 absolute top-2 left-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 py-4">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <input type="email" placeholder="Email" value={email} readOnly
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required 
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required 
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            {message && <p className="text-red-500">{message}</p>}
            <button type="submit" className="w-full p-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
