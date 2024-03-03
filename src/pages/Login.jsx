import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    // Reset error
    setError('');
    try {
        //Call the API
        const res = await axios.post('http://localhost:3000/login', { email, password });
        console.log(res.data);
        toast("User logged in successfully!", {
            closeButton: false,
            autoClose: 3000
        });
        setTimeout(() => {
            navigate('/');
        }, 3000);
    } catch (err) {
        // Check if err.response is defined before trying to access err.response.data.error
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError(err.message);
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-12 bg-white rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={login} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;