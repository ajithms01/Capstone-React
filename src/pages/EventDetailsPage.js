import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
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
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-sky-200">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={eventDetails.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      id="type"
                      name="type"
                      value={eventDetails.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventDetails.location}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetailsPage;