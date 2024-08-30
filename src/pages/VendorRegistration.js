import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const VendorRegistrationPage = () => {
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorPhone: '',
    vendorLocation: '',
    type: '',
    provides: '',
  });
  const handleProvidesChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setVendorDetails((prev) => ({ ...prev, provides: selected }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Vendor details submitted:', vendorDetails);

    try {
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorDetails),
      });

      if (response.ok) {
        alert('Vendor registered successfully');
        // Optionally reset form fields after successful submission
        setVendorDetails({
          vendorName: '',
          vendorEmail: '',
          vendorPhone: '',
          vendorLocation: '',
          type: '',
          provides: '',
        });
      } else {
        alert('Failed to register vendor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the vendor');
    }
  };

  return (
    <div className="flex h-full bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main content */}
      <div className="flex-1">
        {/* Navbar */}
        <NavBar/>

        {/* Vendor Registration Form */}
        <div className="p-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Vendor Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="vendorName" className="block mb-2 text-lg font-medium text-gray-700">Vendor Name</label>
                <input
                  type="text"
                  id="vendorName"
                  name="vendorName"
                  value={vendorDetails.vendorName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="vendorEmail" className="block mb-2 text-lg font-medium text-gray-700">Vendor Email</label>
                <input
                  type="email"
                  id="vendorEmail"
                  name="vendorEmail"
                  value={vendorDetails.vendorEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="vendorPhone" className="block mb-2 text-lg font-medium text-gray-700">Vendor Phone</label>
                <input
                  type="tel"
                  id="vendorPhone"
                  name="vendorPhone"
                  value={vendorDetails.vendorPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="vendorLocation" className="block mb-2 text-lg font-medium text-gray-700">Vendor Location</label>
                <input
                  type="text"
                  id="vendorLocation"
                  name="vendorLocation"
                  value={vendorDetails.vendorLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-lg font-medium text-gray-700">Type</label>
                <select
                  id="type"
                  name="type"
                  value={vendorDetails.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="photographer">Photographer</option>
                  <option value="caterer">Caterer</option>
                  <option value="dj">DJ</option>
                  <option value="decorator">Decorator</option>
                  <option value="venue">Venue</option>
                </select>
              </div>
              {/* <div>
                <label htmlFor="provides" className="block mb-2 text-lg font-medium text-gray-700">Services Provided</label>
                <select
                  id="provides"
                  name="provides"
                  multiple
                  value={vendorDetails.provides}
                  onChange={handleProvidesChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                >
                  <option value="photography">Photography</option>
                  <option value="catering">Catering</option>
                  <option value="dj">DJ Services</option>
                  <option value="decoration">Decoration</option>
                  <option value="venue_rental">Venue Rental</option>
                </select>
              </div> */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistrationPage;
