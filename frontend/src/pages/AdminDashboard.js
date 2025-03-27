import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      const data = await response.json();
      console.log("Fetched users:", data);
  
      setUsers(data); // Assuming the response is a JSON array of users
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);  // Set error state to display to the user
    }
  };
  

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken'); // Get token for authorization
      
      const response = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include token for authorization
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Admin: {localStorage.getItem('username')}</h2> {/* Display admin's username */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${user._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
