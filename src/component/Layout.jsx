import React, { useState } from 'react';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <div className={`fixed z-30 ${isExpanded ? 'block' : 'hidden'} md:block`}>
        <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`w-full transition-all duration-300 ${isExpanded ? '' : 'md:ml-3'} ${isExpanded ? 'md:pl-56' : 'md:pl-16'}`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
