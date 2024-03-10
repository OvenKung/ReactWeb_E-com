import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; // import useAuth hook
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { set } from 'mongoose';


const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, username, login, logout, setUsername } = useAuth(); // use useAuth hook
  const [dropdownOpen, setDropdownOpen] = useState(false); // add state for dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // get current time in seconds
      if (decoded.exp > currentTime) { // check if token is not expired
        setIsLoggedIn(true); // set isLoggedIn to true if token exists and is not expired
      } else if (!isLoggedIn) { // add this condition
        setIsLoggedIn(false); // set isLoggedIn to false if token is expired
        toast.error("Session expired. Please login again.", {
          closeButton: false,
          autoClose: 3000
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        //ลบtoken ออกจาก localstorage
        //localStorage.removeItem('token');
      }
    } else {
      setIsLoggedIn(false); // set isLoggedIn to false if token does not exist
    }
  }, []);
  
  useEffect(() => {
    setUsername(username); // log the username
  }, [username]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <nav className="bg-blue-600 py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl">Logo</div>
        <div>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <div className="relative inline-block text-left">
                <div>
                  <button type="button" className="text-white" onClick={toggleDropdown}>
                    {username}
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                    <div className="py-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button onClick={logout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem">Logout</button>
                      <Link to="/changepassword" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem">Change Password</Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <li><Link to="/login" className="text-white">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
