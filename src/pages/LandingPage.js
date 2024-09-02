import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const events = ['Wedding', 'Conference', 'DJ Party', 'Corporate Event', 'Birthday Party'];
  const addOns = ['Photography', 'Light & Sound', 'Decoration', 'Catering', 'Transportation'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Eventio</div>
          <div className="space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">About Us</a>
            <a href="#" className="text-white">Contact Us</a>
          </div>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-4 py-2 rounded">Login</button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded">Register</button>
          </div>
        </div>
      </nav>

      {/* Image Slider */}
      <div className="relative h-1/2 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Events Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Events We Organize</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded shadow text-center">
                {event}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Available Add-ons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow text-center">
                {addon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Button */}
      <div className="text-center py-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300">
          Join Us
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Eventio. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mx-2 hover:underline">Privacy Policy</a>
            <a href="#" className="mx-2 hover:underline">Terms of Service</a>
            <a href="#" className="mx-2 hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
