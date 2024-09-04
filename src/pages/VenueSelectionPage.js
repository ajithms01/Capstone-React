import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const dummyVenues = [
  { id: 1, name: "Grand Ballroom", capacity: 500, location: "Andheri, Mumbai, Maharashtra", rent: 50000 },
  { id: 2, name: "Seaside Resort", capacity: 300, location: "Calangute, Goa", rent: 40000 },
  { id: 3, name: "Mountain Retreat", capacity: 200, location: "Kufri, Himachal Pradesh", rent: 30000 },
  { id: 4, name: "City View Hall", capacity: 400, location: "Connaught Place, New Delhi", rent: 45000 },
  { id: 5, name: "Garden Paradise", capacity: 250, location: "Jayanagar, Bangalore, Karnataka", rent: 35000 },
  { id: 6, name: "Historic Mansion", capacity: 150, location: "Chandni Chowk, Delhi", rent: 38000 },
  { id: 7, name: "Riverside Pavilion", capacity: 350, location: "Bagdogra, Siliguri, West Bengal", rent: 42000 },
  { id: 8, name: "Forest Glade", capacity: 180, location: "Mysore Road, Mysore, Karnataka", rent: 32000 },
  { id: 9, name: "Desert Oasis", capacity: 100, location: "Jaisalmer, Rajasthan", rent: 28000 },
  { id: 10, name: "Lakeside Lodge", capacity: 220, location: "Lake Pichola, Udaipur, Rajasthan", rent: 36000 },
  { id: 11, name: "Cultural Heritage Center", capacity: 270, location: "Assi Ghat, Varanasi, Uttar Pradesh", rent: 39000 },
  { id: 12, name: "Cliffside Event Space", capacity: 130, location: "Auroville, Pondicherry", rent: 34000 },
  { id: 13, name: "Urban Loft", capacity: 90, location: "Bandra West, Mumbai, Maharashtra", rent: 25000 },
  { id: 14, name: "Countryside Barn", capacity: 160, location: "Pawna, Lonavala, Maharashtra", rent: 31000 },
  { id: 15, name: "Palace Grounds", capacity: 600, location: "Amer Palace, Jaipur, Rajasthan", rent: 55000 },
  { id: 16, name: "Island Villa", capacity: 120, location: "Havelock Island, Andaman and Nicobar Islands", rent: 37000 },
  { id: 17, name: "Skyline Terrace", capacity: 240, location: "Bandra Kurla Complex, Mumbai, Maharashtra", rent: 41000 },
  { id: 18, name: "Winter Chalet", capacity: 140, location: "Solang Valley, Manali, Himachal Pradesh", rent: 33000 },
  { id: 19, name: "Meadow View", capacity: 200, location: "Sector 17, Chandigarh", rent: 30000 },
  { id: 20, name: "Crystal Ballroom", capacity: 400, location: "DLF CyberHub, Gurgaon, Haryana", rent: 48000 },
];

const VenueCard = ({ venue, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{venue.name}</h3>
      <p className="text-gray-600">Capacity: {venue.capacity}</p>
      <p className="text-gray-600">Location: {venue.location}</p>
      <p className="text-gray-600">Rent: ${venue.rent}</p>
    </div>
    <button 
      onClick={() => onSelect(venue)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Select Venue
    </button>
  </div>
);

const VenueSelectionPage = () => {
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [randomVenues, setRandomVenues] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const eventDetails = location.state?.eventDetails || {};

  useEffect(() => {
    const getRandomVenues = (venues, num) => {
      const shuffled = [...venues].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    const randomSelection = getRandomVenues(dummyVenues, 4);
    setRandomVenues(randomSelection);
  }, []);

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
    navigate('/addons', { state: { eventDetails, selectedVenues } });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="p-6 h-full overflow-auto flex space-x-6 w-full bg-sky-200">
          <div className="w-3/4 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} onSelect={handleSelectVenue} />
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleNext} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
          
          <div className="w-1/4 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Selected Venues</h2>
            <div className="space-y-4">
              {selectedVenues.map(venue => (
                <div key={venue.id} className="flex justify-between items-center">
                  <span className="text-gray-800">{venue.name}</span>
                  <button
                    onClick={() => handleRemoveVenue(venue)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800">Total Budget</h3>
              <p className="text-2xl font-bold text-gray-800">${totalBudget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSelectionPage;
