import { User, LogOut } from 'lucide-react';
import React from 'react';

function NavBar() {
  // Retrieve username from localStorage
  const username = localStorage.getItem('username') || 'UserName';

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('clientId');

    // Redirect to login page or any other action needed after logout
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Eventio</h1>
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-gray-700">
            <User className="mr-2" />
            <span className="font-medium">{username}</span>
          </span>
          <button 
            onClick={handleLogout} 
            className="flex items-center text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
          >
            <LogOut className="mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
