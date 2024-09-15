import React, { useState } from 'react';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ darkMode, toggleDarkMode, setDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`fixed z-30 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'} md:block`}>
        <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      </div>
      <div
        className={`w-full transition-all duration-300 ${isExpanded ? 'md:pl-56' : 'md:pl-16'}`}
      >
        <Header toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode}/>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
