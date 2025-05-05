import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, LogoutIcon } from '@heroicons/react/outline'; // Icons from Heroicons
import AlertNotification from './AlertNotification';
import{useAlerts}from'./usecontext/AlertContext'

const Header = ({ user, setUser,fetchedAlerts }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const isLoggedIn = window.localStorage.getItem("loggedInUser") || null;


  const { alerts, alertCount } = useAlerts(); // Access alerts and alertCount from context


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Clear token or user data
    localStorage.removeItem('token'); // Clear token or user data

    navigate('/login'); // Redirect to login
  };


  return (
    <header className="bg-blue-600 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Alert System</h1>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-4">
            <li><Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link></li>
            {!isLoggedIn && <li><Link to="/login" className="hover:text-blue-300">Login</Link></li>}
            {!isLoggedIn && <li><Link to="/signup" className="hover:text-blue-300">Signup</Link></li>}
          </ul>

          {isLoggedIn && (
            <div className="relative">
              {/* Notification Bell Icon */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:text-blue-300 focus:outline-none"
              >
                <BellIcon className="h-6 w-6" />
                {/* Notification Count */}
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {/* Replace with dynamic count */}
                  {alertCount}
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md text-gray-800 z-50">
                  <AlertNotification />
                </div>
              )}
              

            </div>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-blue-300 focus:outline-none"
            >
              <LogoutIcon className="h-6 w-6" />
              <span>Logout</span>
            </button>
          )}
        </nav>
      </div>

      {/* User Info */}
      {isLoggedIn && (
        <div className="mt-2 text-sm text-blue-200 text-right">
          Welcome, {isLoggedIn} {user?.role && `(${user?.role})`}!
        </div>
      )}
    </header>
  );
};

export default Header;
