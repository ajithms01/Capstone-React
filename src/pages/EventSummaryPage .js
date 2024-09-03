import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const EventSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientId, setClientId] = useState(null);
  const username = localStorage.getItem('username');

  // Fetch clientId based on username
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get('http://localhost:9598/user/getUser', {
          params: { username: username },
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

  // Extracting state or defaulting to empty arrays and objects
  const { selectedVenues = [], selectedAddOns = [], totalBudget = 0, eventDetails = {} } = location.state || {};

  const handleSubmit = async () => {
    try {
      const eventPayload = {
        id: 0,
        name: eventDetails.eventName || "Sample Event",
        date: eventDetails.eventDate || new Date().toISOString(),
        type: eventDetails.eventType || "General",
        userId: clientId,
        vendorIds: selectedAddOns.map(addOn => addOn.vendorId),
        venueId: selectedVenues.length > 0 ? selectedVenues[0].id : 0 , // Example logic
        guestList: [] // Add guest details if available
      };

      const response = await axios.post('http://localhost:9598/api/event', eventPayload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEdit = () => {
    // Navigate back to the previous page to allow editing
    navigate(-1);
  };

  return (
    <div className="flex h-full bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar />

        {/* Event Summary */}
        <div className="p-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Event Summary</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Event Name</h3>
                <p className="text-xl text-gray-900">{eventDetails.eventName || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Host</h3>
                <p className="text-xl text-gray-900">{eventDetails.host || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Date</h3>
                <p className="text-xl text-gray-900">{eventDetails.eventDate || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Venues</h3>
                <ul className="list-disc list-inside">
                  {selectedVenues.length > 0 ? (
                    selectedVenues.map((venue) => (
                      <li key={venue.id} className="text-xl text-gray-900">
                        {venue.name} - ${venue.rent}
                      </li>
                    ))
                  ) : (
                    <li className="text-xl text-gray-900">No venues selected</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Add-Ons</h3>
                <ul className="list-disc list-inside">
                  {selectedAddOns.length > 0 ? (
                    selectedAddOns.map((addOn) => (
                      <li key={addOn.vendorId} className="text-xl text-gray-900">
                        {addOn.vendorName} - ${addOn.rate}
                      </li>
                    ))
                  ) : (
                    <li className="text-xl text-gray-900">No add-ons selected</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Total Budget</h3>
                <p className="text-2xl font-bold text-gray-900">${totalBudget}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummaryPage;
