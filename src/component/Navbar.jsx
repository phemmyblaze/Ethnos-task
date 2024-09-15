import React, { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { IoAlbums } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { BiCollapse } from "react-icons/bi";

const Links = [
  { id: 1, path: "/", name: "Users", icon: FaUsers },
  { id: 2, path: "/posts", name: "Posts", icon: MdOutlinePostAdd },
  { id: 3, path: "/todos", name: "Todos", icon: RiTodoLine },
  { id: 4, path: "/albums", name: "Albums", icon: IoAlbums },
  { id: 5, path: "#", name: "Settings", icon: IoSettings },
];



const Navbar = ({ isExpanded, toggleSidebar, toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem('activeLinkIndex');
    if (storedIndex !== null) {
      setActive(Number(storedIndex));
    } else {
      const currentPath = location.pathname;
      const currentLinkIndex = Links.findIndex(link => link.path === currentPath);
      if (currentLinkIndex !== -1) {
        setActive(currentLinkIndex);
      }
    }
  }, [location.pathname]);

  const handleClick = (index) => {
    setActive(index);
    localStorage.setItem('activeLinkIndex', index);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div className={`${toggleDarkMode && "dark"}`}>
      <div className={`fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 transition-all duration-300 bg-white ${isExpanded ? 'w-56 animate-spin-in' : 'w-16 animate-spin-out'} md:transition-width`}>
        <div className={`mb-8 grid items-center ${isExpanded ? "grid-cols-2" : "grid-cols-1"}`}>
          <img src='/logo.png' alt='logo' className={`transition-all duration-300 ${isExpanded ? 'w-28' : 'w-8'}`} />
          <button 
            onClick={toggleSidebar} 
            className={`transition-all duration-300 ${isExpanded ? 'ml-auto' : 'mr-auto'}`}
          >
            <BiCollapse size={24} color='#4f46e5'/>
          </button>
        </div>

        <ul className='mt-6 space-y-6'>
          {Links.map((link, index) => (
            <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${active === index ? "bg-indigo-100 text-indigo-500" : "text-gray-500"}`}>
              <Link to={link.path} className='flex justify-center items-center space-x-3' onClick={() => handleClick(index)}>
                <span>{link.icon()}</span>
                <span className={`text-sm transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
