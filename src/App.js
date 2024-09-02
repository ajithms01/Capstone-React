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
import LandingPage, { LandinngPageOne } from './pages/LandingPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/venues" element={<VenueSelectionPage />} />
        <Route path="/addons" element={<AddOnSelectionPage />} />
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/vendorregistration" element={<VendorRegistrationPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
