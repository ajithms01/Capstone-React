import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

// Define or import AddOnCard component if it's not defined elsewhere
const AddOnCard = ({ addOn, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-2">{addOn.type}</h3>
      <p>Vendor: {addOn.vendorName}</p>
      <p>Location: {addOn.vendorLocation}</p>
      <p>Phone: {addOn.vendorPhone}</p>
      <p>Rate: ${addOn.rate}</p> {/* Changed from rent to rate */}
    </div>
    <button 
      onClick={() => onSelect(addOn)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Select Add-On
    </button>
  </div>
);

const dummySelectedVenues = [
  { id: 1, name: "Grand Ballroom", rent: 5000 }
];

const AddOnSelectionPage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalBudget, setTotalBudget] = useState(
    dummySelectedVenues.reduce((sum, venue) => sum + venue.rent, 0)
  );
  const [vendors, setVendors] = useState([]);
  const [location, setLocation] = useState("Midtown"); // Example location
  const [date, setDate] = useState(new Date()); // Example date
  const [type, setType] = useState(""); // Optional type, can be set based on user selection

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8082/vendor/getVendorByChoice', {
          params: {
            location,
            date: date.toISOString().split('T')[0], // Format date as yyyy-MM-dd
            type: type || undefined, // Send type only if it's set
          },
        });
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        alert('Failed to fetch vendors. Please try again later.');
      }
    };

    fetchVendors();
  }, [location, date, type]); // Fetch vendors when location, date, or type changes

  const handleSelectAddOn = (addOn) => {
    if (!selectedAddOns.find(a => a.vendorId === addOn.vendorId)) { // Use vendorId for uniqueness
      setSelectedAddOns([...selectedAddOns, addOn]);
      setTotalBudget(totalBudget + addOn.rate); // Changed from rent to rate
    }
  };

  const handleRemoveAddOn = (addOn) => {
    setSelectedAddOns(selectedAddOns.filter(a => a.vendorId !== addOn.vendorId)); // Use vendorId for uniqueness
    setTotalBudget(totalBudget - addOn.rate); // Changed from rent to rate
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <NavBar />
        <div className="p-6 h-full overflow-auto">
          <div className="flex space-x-6">
            {/* Main card with add-on listings */}
            <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Add-Ons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map(addOn => (
                  <AddOnCard key={addOn.vendorId} addOn={addOn} onSelect={handleSelectAddOn} /> 
                ))}
              </div>
            </div>

            {/* Selection card */}
            <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Selected Items</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Venues</h3>
                {dummySelectedVenues.map(venue => (
                  <div key={venue.id} className="flex justify-between items-center">
                    <span>{venue.name}</span>
                    <span>${venue.rent}</span>
                  </div>
                ))}
                <h3 className="text-xl font-semibold mt-6">Add-Ons</h3>
                {selectedAddOns.map(addOn => (
                  <div key={addOn.vendorId} className="flex justify-between items-center">
                    <span>{addOn.vendorName}</span>
                    <div>
                      <span className="mr-4">${addOn.rate}</span> {/* Changed from rent to rate */}
                      <button 
                        onClick={() => handleRemoveAddOn(addOn)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
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

export default AddOnSelectionPage;
