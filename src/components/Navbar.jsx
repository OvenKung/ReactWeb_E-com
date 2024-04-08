import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; // import useAuth hook
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';


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
    <nav className="navbar bg-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="flex-none ml-20">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex items-center justify-end" onClick={toggleDropdown}>
              {username}
            </div>
            {dropdownOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-500 rounded-box w-52">
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
                <li>
                  <Link to="/changepassword">Change Password</Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex items-center justify-start">
              <Link to="/login">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
