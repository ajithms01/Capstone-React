import React, { useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';

function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const events = {
    5: ["Event A", "Event B"],
    12: ["Event C"],
    20: ["Event D", "Event E", "Event F"]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar/>
      <div className="flex-1">
        <AdminNavBar/>
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4 mx-4">
  <h3 className="text-lg font-semibold mb-2">Calendar</h3>
  <div className="grid grid-cols-7 gap-2">
    {[...Array(30).keys()].map(day => (
      <div
        key={day}
        className="px-4 py-5 border rounded-lg text-center cursor-pointer hover:bg-blue-100 text-sm"
        onMouseEnter={() => setSelectedDate(day + 1)}
        onMouseLeave={() => setSelectedDate(null)}
      >
        {day + 1}
      </div>
    ))}
  </div>
</div>


        {selectedDate && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h4 className="font-semibold">Events on Day {selectedDate}:</h4>
            <ul>
              {events[selectedDate] ? events[selectedDate].map((event, index) => (
                <li key={index}>{event}</li>
              )) : <li>No events</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;