import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FiUsers, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi'; // Import desired icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen bg-gray-800 w-64 fixed top-0 left-0 overflow-y-auto shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-center bg-blue-600 text-white text-2xl font-bold p-5 border-b border-blue-700">
        Admin Panel
      </div>
      {/* Sidebar Navigation */}
      <nav className="mt-8">
        <div className="px-6">
          {/* Each Sidebar Item */}
          <li className="my-3 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Link to="/dashboard" className="text-gray-200 flex items-center">
              <FiUsers className="mr-3" /> Users
            </Link>
          </li>
          {/* Add more items as needed */}
          <li className="my-3 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Link to="/settings" className="text-gray-200 flex items-center">
              <FiSettings className="mr-3" /> Settings
            </Link>
          </li>
        </div>
      </nav>
      {/* Sidebar Footer */}
      <div className="absolute bottom-0 w-full p-5 border-t border-gray-700">
        <button className="text-gray-300 flex items-center" onClick={() => {
          localStorage.removeItem('token'); // replace 'token' with the key you used to store the token
          navigate('/login');
        }}>
          <FiLogOut className="mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
