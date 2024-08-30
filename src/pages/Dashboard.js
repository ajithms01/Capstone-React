import React, { useState } from 'react';
import { User, PlusCircle, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const events = [
  { id: 1, title: 'Team Meeting', date: '2024-08-30', time: '10:00 AM' },
  { id: 2, title: 'Project Deadline', date: '2024-09-15', time: '11:59 PM' },
  { id: 3, title: 'Conference Call', date: '2024-09-05', time: '2:00 PM' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const today = new Date();
  
  // Function to filter events
  const getFilteredEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    });
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
                    <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                    <p className="text-gray-600">{event.date} at {event.time}</p>
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