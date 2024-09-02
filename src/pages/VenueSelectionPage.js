import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const dummyVenues = [
  { id: 1, name: "Grand Ballroom", capacity: 500, location: "Midtown", rent: 5000 },
  { id: 2, name: "Seaside Resort", capacity: 300, location: "Beach Front", rent: 4000 },
  { id: 3, name: "Mountain Retreat", capacity: 200, location: "Highlands", rent: 3000 },
  { id: 4, name: "City View Hall", capacity: 400, location: "City Center", rent: 4500 },
  { id: 5, name: "Garden Paradise", capacity: 250, location: "Suburban", rent: 3500 },
  { id: 6, name: "Historic Mansion", capacity: 150, location: "Old Town", rent: 3800 },
];

const VenueCard = ({ venue, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
      <p>Capacity: {venue.capacity}</p>
      <p>Location: {venue.location}</p>
      <p>Rent: ${venue.rent}</p>
    </div>
    <button 
      onClick={() => onSelect(venue)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Select Venue
    </button>
  </div>
);

const VenueSelectionPage = () => {
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const eventDetails = location.state?.eventDetails || {};
  const eventLocation = eventDetails.eventLocation?.trim().toLowerCase() || "";

  useEffect(() => {
    console.log('Received event details:', eventDetails);
    const filtered = dummyVenues.filter(venue => venue.location.toLowerCase() === eventLocation);
    setFilteredVenues(filtered);
  }, [eventLocation, eventDetails]);

  const handleSelectVenue = (venue) => {
    if (!selectedVenues.find(v => v.id === venue.id)) {
      setSelectedVenues([...selectedVenues, venue]);
      setTotalBudget(totalBudget + venue.rent);
    }
  };

  const handleRemoveVenue = (venue) => {
    setSelectedVenues(selectedVenues.filter(v => v.id !== venue.id));
    setTotalBudget(totalBudget - venue.rent);
  };

  const handleNext = () => {
    navigate('/addons', { state: { selectedVenues, eventDetails } });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <NavBar />
        <div className="p-6 h-full overflow-auto">
          <div className="flex space-x-6">
            <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Venues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.length > 0 ? (
                  filteredVenues.map(venue => (
                    <VenueCard key={venue.id} venue={venue} onSelect={handleSelectVenue} />
                  ))
                ) : (
                  <p>No venues available in this location.</p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button 
                  onClick={handleNext} 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
              <hr className="mt-4 border-gray-300" />
            </div>
            
            <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Selected Venues</h2>
              <div className="space-y-4">
                {selectedVenues.map(venue => (
                  <div key={venue.id} className="flex justify-between items-center">
                    <span>{venue.name}</span>
                    <button
                      onClick={() => handleRemoveVenue(venue)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-xl font-semibold">Total Budget</h3>
                <p className="text-2xl font-bold">${totalBudget}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSelectionPage;
