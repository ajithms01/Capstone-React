import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import axios from 'axios';

const EventCreationPage = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    host: '', // Assuming the host is the logged-in user's name
    eventType: '',
    eventLocation: '',
    eventDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:9598/user/getUser`, {
          params: { username }
        });
        const userData = response.data;
        setEventDetails(prevDetails => ({
          ...prevDetails,
          host: userData.name // Set the host field to the user's name
        }));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event details to be passed:', eventDetails);
    navigate('/venues', { state: { eventDetails } });
  };

  return (
    <div className="flex h-full bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1">
        <NavBar />
        <div className="p-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="eventName" className="block mb-2 text-lg font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="host" className="block mb-2 text-lg font-medium text-gray-700">Host</label>
                <input
                  type="text"
                  id="host"
                  name="host"
                  value={eventDetails.host}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block mb-2 text-lg font-medium text-gray-700">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={eventDetails.eventType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="conference">Conference</option>
                  <option value="party">Party</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>
              <div>
                <label htmlFor="eventLocation" className="block mb-2 text-lg font-medium text-gray-700">Event Location</label>
                <input
                  type="text"
                  id="eventLocation"
                  name="eventLocation"
                  value={eventDetails.eventLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="eventDate" className="block mb-2 text-lg font-medium text-gray-700">Event Date</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={eventDetails.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreationPage;
