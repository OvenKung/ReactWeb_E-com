import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuAdmin from '../components/MenubarAdmin';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setAllUsers(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                console.log('Deleting user with id:', id);
                await axios.delete(`http://localhost:3000/deleteusers/${id}`);
                fetchUsers(); // Refresh the users list
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const updateUser = async (id) => {
        // Update user logic here
        // You might want to open a form where the admin can edit the user details
    };

    const [searchTerm, setSearchTerm] = useState('');

    const searchUser = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filteredUsers = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    const resetSearch = () => {
        setUsers(allUsers);
        setSearchTerm('');
    };

    return (
        <div>
            <MenuAdmin />
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                    <div className="flex items-center bg-white p-2 rounded-full shadow-sm">
                        <input
                            className="form-input mr-2 rounded-lg w-60 h-10 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:border-gray-400"
                            type="text"
                            placeholder="  Search users..."
                            value={searchTerm}
                            onChange={(e) => searchUser(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={resetSearch}
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-white rounded-lg shadow-md">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="text-center bg-gray-100 hover:bg-gray-200">
                                    <td className="text-gray-700 border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => updateUser(user._id)}>Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;