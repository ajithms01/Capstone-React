import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [success, setSuccess] = useState('');
=======
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
>>>>>>> 6e5cf17e93fa5deac96f2569025f83865dd8523c

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
<<<<<<< HEAD
    setSuccess('');

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:9598/auth/login', {
        username,
        password
      });

      // Assuming your backend returns a token as a string
      const token = response.data;

      if (token) {
        setSuccess('Login successful!');
        // Store the token in localStorage or handle it as needed
        localStorage.setItem('authToken', token);
        // Redirect to a dashboard or home page
        window.location.href = '/dashboard'; // Change to your desired route
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred during login');
      } else {
        setError('An error occurred during login');
      }
=======
    setLoading(true);

    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post('http://localhost:8082/client/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Login successful, redirect to dashboard
        navigate('/dashboard');
      } else {
        // Login failed, set error message
        setError(response.data.message || 'Login failed'); // Use specific error message if available
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
>>>>>>> 6e5cf17e93fa5deac96f2569025f83865dd8523c
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
<<<<<<< HEAD
        {success && <div className="text-green-500 text-center">{success}</div>}
=======
        {loading && <div className="text-blue-500 text-center">Loading...</div>}
>>>>>>> 6e5cf17e93fa5deac96f2569025f83865dd8523c
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;