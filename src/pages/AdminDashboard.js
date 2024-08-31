import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';

function AdminDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedDate) return;
  
      try {
        const selectedDay = format(selectedDate, 'yyyy-MM-dd'); // Format the selected date
        const response = await axios.get(`http://localhost:8081/api/event/eventDate`, {
          params: { date: selectedDay }
        });
        console.log('Fetched events:', response.data);
        setEvents({ [selectedDay]: response.data });
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events. Please try again later.');
      }
    };
  
    fetchEvents();
  }, [selectedDate]); // Re-fetch events when selectedDate changes
  

  const renderHeader = () => {
    return (
      <div className="flex justify-between mb-2"> {/* Reduced margin-bottom */}
        <button onClick={prevMonth} className="bg-gray-200 p-1 rounded text-sm">Previous</button> {/* Smaller padding and font size */}
        <h2 className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</h2> {/* Reduced font size */}
        <button onClick={nextMonth} className="bg-gray-200 p-1 rounded text-sm">Next</button> {/* Smaller padding and font size */}
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold text-xs"> {/* Reduced font size */}
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>; {/* Reduced grid gap */}
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`px-2 py-3 border rounded text-center cursor-pointer hover:bg-blue-100 text-xs ${ /* Reduced padding and font size */
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${isSameDay(day, selectedDate) ? 'bg-blue-200' : ''}`}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1"> {/* Reduced grid gap */}
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };
  

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderEvents = () => {
    const selectedDay = format(selectedDate, 'yyyy-MM-dd'); // Adjust according to your event data format
    return (
      <div className="mt-4 p-4 bg-gray-200 rounded">
        <h4 className="font-semibold">Events on {selectedDay}:</h4>
        <ul>
          {events[selectedDay] ? (
            events[selectedDay].map((event, index) => (
              <li key={index}>{event.name} : {event.host}</li>
            ))
          ) : (
            <li>No events</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar/>
      <div className="flex-1">
        <AdminNavBar/>
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4 mx-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        {renderEvents()}
      </div>
    </div>
  );
}

export default AdminDashboard;
