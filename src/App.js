import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VenueSelectionPage from './pages/VenueSelectionPage';
import AddOnSelectionPage from './pages/AddOnSelectionPage';
import ApprovalPage from './pages/ApprovalPage';
import UserRegistration from './pages/UserRegistration';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import VendorRegistrationPage from './pages/VendorRegistration';
<<<<<<< HEAD
import LandingPage, { LandinngPageOne } from './pages/LandingPage';
=======
import EventSummaryPage from './pages/EventSummaryPage ';
import UserProfile from './UserProfile';
import EventCreationPage from './pages/EventCreation';
>>>>>>> 6e5cf17e93fa5deac96f2569025f83865dd8523c


const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<Profile/>} />
=======
      <Route path="/profile" element={<Profile/>} />
      <Route path="/profile1" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/create' element={<EventCreationPage/>} />
>>>>>>> 6e5cf17e93fa5deac96f2569025f83865dd8523c
        <Route path="/venues" element={<VenueSelectionPage />} />
        <Route path="/addons" element={<AddOnSelectionPage />} />
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/summary" element={<EventSummaryPage/>} />
        <Route path="/vendorregistration" element={<VendorRegistrationPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
