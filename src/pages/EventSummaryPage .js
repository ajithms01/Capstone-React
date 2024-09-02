import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const EventSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting state or defaulting to empty arrays and objects
  const { selectedVenues = [], selectedAddOns = [], totalBudget = 0, eventDetails = {} } = location.state || {};

  const handleEdit = () => {
    // Navigate back to the previous page to allow editing
    navigate(-1);
  };

  const handleNext = () => {
    // Navigate to the next step, e.g., payment or confirmation page
    navigate('/confirmation', { state: { eventDetails, selectedVenues, selectedAddOns, totalBudget } });
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
                    selectedVenues.map(venue => (
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
                    selectedAddOns.map(addOn => (
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
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummaryPage;
