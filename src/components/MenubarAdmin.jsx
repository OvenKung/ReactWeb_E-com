import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-100 w-64 fixed top-0 left-0 overflow-y-auto">
      <div className="bg-white text-2xl font-bold p-5 border-b border-gray-200">
        <Link to="/">Admin Panel</Link>
      </div>
      <nav className="mt-8">
        <div className="px-6">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Users</h2>
          <ul className="mt-3">
            {/* Add your submenus here */}
            <li className="mt-2">
              <Link to="/users" className="text-gray-700 flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <span className="ml-2">All Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;