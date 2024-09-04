import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9598/api/event/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        setError('Error fetching event details');
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleGenerateGuestLink = async () => {
    try {
      // Example API endpoint for generating guest link
      const response = await axios.post(`http://localhost:9598/api/event/${eventId}/generateLink`);
      alert(`Guest link generated: ${response.data.link}`); // Display or use the generated link
    } catch (error) {
      console.error('Error generating guest link:', error);
      alert('Failed to generate guest link');
    }
  };

  const handleMakePayment = async () => {
    try {
      // Example API endpoint for initiating payment
      const response = await axios.post(`http://localhost:9598/api/event/${eventId}/payment`);
      alert('Payment initiated successfully');
      // Handle successful payment response here, such as redirecting or updating state
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Failed to make payment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event data found</div>;
console.log(event);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Event Details */}
        <div className="p-6 md:p-8 lg:p-10 flex-1 mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden ring-1 ring-gray-200">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{event.name}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Type</h3>
                  <p className="text-base text-gray-900">{event.type || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Date</h3>
                  <p className="text-base text-gray-900">
                    {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                  <p className="text-base text-gray-900">{event.eventLocation || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Host</h3>
                  <p className="text-base text-gray-900">{event.host || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 flex justify-end gap-4">
              <button
                onClick={handleGenerateGuestLink}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-300 ease-in-out"
              >
                Generate Guest Link
              </button>
              <button
                onClick={handleMakePayment}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
