import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
          navigate('/');
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="p-12 bg-white rounded-2xl shadow-xl w-96">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Change Password</h2>
    <form onSubmit={handleChangePassword} className="space-y-6">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
        className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required 
        className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required 
        className="w-full p-2 border border-gray-300 rounded-md" />
      {message && <p className="text-red-500">{message}</p>}
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Change Password</button>
    </form>
  </div>
</div>
  );
}

export default ChangePassword;