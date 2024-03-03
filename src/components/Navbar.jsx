import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl">Logo</div>
        <div>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/register" className="text-white">Register</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
            <li><Link to="/changepassword" className="text-white">Change Password</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;