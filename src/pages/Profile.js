import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import axios from 'axios'; // You'll need this for making API calls

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    phoneNumber: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you'd typically send the data to the server
    axios.post('/api/user-details', userDetails)
      .then(response => {
        console.log('User details saved:', response.data);
        alert('User details saved successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the user details!', error);
        alert('Failed to save user details.');
      });
  };

  return (
    <div className="flex h-full bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1">
        {/* Navbar */}
        <NavBar />

        {/* User Details Form */}
        <div className="p-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">User Details</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-lg font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-lg font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
