import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import context

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Access the login function from context

  const loginUser = async (e) => {
    e.preventDefault();
    const userData = { email, password };
  
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
  
      console.log('User logged in:', data);
  
      // Store the user in context and localStorage
      login(data.user);

      // Check if the user role is admin and navigate accordingly
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');  // Redirect to admin dashboard
      } else {
        navigate('/mainpage');  // Redirect to regular user page (e.g., Prayer Times)
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-96">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={loginUser} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border rounded-xl focus:ring focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full p-3 border rounded-xl focus:ring focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="w-full bg-primary text-white py-3 rounded-xl hover:bg-secondary transition">
            Login
          </button>
        </form>
        <p className="text-center text-text mt-4">
          Don't have an account?{' '}
          <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/register')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
