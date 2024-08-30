import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

// Dummy data for add-ons - replace this with your API call
const dummyAddOns = [
  { id: 1, type: "Photography", vendorName: "SnapPro", vendorLocation: "Downtown", vendorPhone: "123-456-7890", rent: 1000 },
  { id: 2, type: "Light and Sound", vendorName: "BrightBeats", vendorLocation: "Midtown", vendorPhone: "234-567-8901", rent: 1500 },
  { id: 3, type: "Decoration", vendorName: "ElegantDecor", vendorLocation: "Uptown", vendorPhone: "345-678-9012", rent: 800 },
  { id: 4, type: "Photography", vendorName: "MemoryMakers", vendorLocation: "Suburb", vendorPhone: "456-789-0123", rent: 1200 },
  { id: 5, type: "Light and Sound", vendorName: "SoundWave", vendorLocation: "City Center", vendorPhone: "567-890-1234", rent: 1300 },
  { id: 6, type: "Decoration", vendorName: "FestiveFlair", vendorLocation: "Historic District", vendorPhone: "678-901-2345", rent: 900 },
];

// Dummy data for selected venues - replace this with actual data from your state management
const dummySelectedVenues = [
  { id: 1, name: "Grand Ballroom", rent: 5000 },
  { id: 2, name: "Seaside Resort", rent: 4000 },
];

const AddOnCard = ({ addOn, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-2">{addOn.type}</h3>
      <p>Vendor: {addOn.vendorName}</p>
      <p>Location: {addOn.vendorLocation}</p>
      <p>Phone: {addOn.vendorPhone}</p>
      <p>Rent: ${addOn.rent}</p>
    </div>
    <button 
      onClick={() => onSelect(addOn)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Select Add-On
    </button>
  </div>
);

const AddOnSelectionPage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalBudget, setTotalBudget] = useState(
    dummySelectedVenues.reduce((sum, venue) => sum + venue.rent, 0)
  );

  const handleSelectAddOn = (addOn) => {
    if (!selectedAddOns.find(a => a.id === addOn.id)) {
      setSelectedAddOns([...selectedAddOns, addOn]);
      setTotalBudget(totalBudget + addOn.rent);
    }
  };

  const handleRemoveAddOn = (addOn) => {
    setSelectedAddOns(selectedAddOns.filter(a => a.id !== addOn.id));
    setTotalBudget(totalBudget - addOn.rent);
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
                {dummyAddOns.map(addOn => (
                  <AddOnCard key={addOn.id} addOn={addOn} onSelect={handleSelectAddOn} />
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
                  <div key={addOn.id} className="flex justify-between items-center">
                    <span>{addOn.type} - {addOn.vendorName}</span>
                    <div>
                      <span className="mr-4">${addOn.rent}</span>
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