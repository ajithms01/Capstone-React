import React, { useState, useEffect } from 'react';
import { User, PlusCircle, LogOut } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [clientId, setClientId] = useState(null); // State to store clientId
  const username = localStorage.getItem('username');

  // Fetch clientId based on username
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get(`http://localhost:9598/client/getUser`, {
          params: {
            username: username
          }
        });
        const fetchedClientId = response.data.id; // Adjust this line based on the actual response structure
        setClientId(fetchedClientId);
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    };

    if (username) {
      fetchClientId();
    }
  }, [username]);

  // Fetch events based on clientId
  useEffect(() => {
    const fetchEvents = async () => {
      if (clientId) {
        try {
          const response = await axios.get(`http://localhost:9598/client/events`, {
            params: {
              clientId: clientId
            }
          });
          console.log('Fetched events:', response.data); // Debugging line
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchEvents();
  }, [clientId]); // Depend on clientId to refetch events when it changes

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar />

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
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
