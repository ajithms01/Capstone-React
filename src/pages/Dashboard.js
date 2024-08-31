import React, { useState, useEffect } from 'react';
import { User, PlusCircle, LogOut } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8082/client/events?clientId=1');
        console.log('Fetched events:', response.data); // Debugging line
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to filter events
  const getFilteredEvents = () => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    });
    console.log('Filtered events:', filteredEvents); // Debugging line
    return filteredEvents;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar/>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Events</h2>
              <div className="space-y-4">
                {getFilteredEvents().map((event) => (
                  <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg text-gray-800">{event.name}</h3>
                    <p className="text-gray-600">{event.date} at {event.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profile</h2>
              <p className="text-gray-600">Profile content goes here.</p>
            </div>
          )}
          {activeTab === 'create-event' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Event</h2>
              <p className="text-gray-600">Event creation form goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
