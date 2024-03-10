import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth(); // use auth context

  const login = async (e) => {
    e.preventDefault();
    // Reset error
    setError('');
    try {
      // Call the API
      const res = await axios.post('http://localhost:3000/login', { email, password });
      auth.login(email, res.data.token); // update login status, username, and pass the token
      toast("User logged in successfully!", {
        closeButton: false,
        autoClose: 3000
      });
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // get current time in seconds
      if (decoded.exp < currentTime) { // check if token is expired
        return true;
      }
    }
    return false;
  }

  return (
    <div className="min-h-screen bg-black-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10 relative">
          <div className="flex justify-center items-center">
            <img className="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          </div>
          <button onClick={() => {
            if (!isTokenExpired()) {
              navigate('/home');
            } else {
              toast.error('Session expired. Please login again.', {
                closeButton: false,
                autoClose: 3000
              });
            }
          }} className="text-indigo-600 hover:text-indigo-500 absolute top-2 left-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 py-4">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={login}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Sign In
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => navigate('/register')} className="w-40 p-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
              <button type="button" onClick={() => navigate('/changepassword')} className="w-40 p-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;