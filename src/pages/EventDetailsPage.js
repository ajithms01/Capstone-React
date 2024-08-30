import React, { useState } from 'react';
import {  Calendar, MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const EventDetailsPage = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    type: '',
    location: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event details submitted:', eventDetails);
    // Here you would typically handle form submission, e.g., sending data to a server
  };

  return (
    <div className="flex h-full bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main content */}
      <div className="flex-1">
        {/* Navbar */}
        <NavBar/>

        {/* Event Details Form */}
        <div className="p-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-lg font-medium text-gray-700">Event Type</label>
                <select
                  id="type"
                  name="type"
                  value={eventDetails.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="conference">Conference</option>
                  <option value="party">Party</option>
                  <option value="djnight">DJ Night</option>
                  <option value="concert">Concert</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block mb-2 text-lg font-medium text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={eventDetails.location}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-700">Date</label>
                <div className="relative">
                  <Calendar className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    required
                  />
                </div>
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

export default EventDetailsPage;