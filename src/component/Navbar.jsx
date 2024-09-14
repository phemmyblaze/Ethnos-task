import React, { useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { IoAlbums } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt2 } from 'react-icons/hi'; 
import { BiCollapse } from "react-icons/bi";

const Links = [
  { id: 1, path: "/", name: "User", icon: FaUsers },
  { id: 2, path: "/posts", name: "Posts", icon: MdOutlinePostAdd },
  { id: 3, path: "/todos", name: "Todos", icon: RiTodoLine },
  { id: 4, path: "/albums", name: "Albums", icon: IoAlbums },
  { id: 5, path: "#", name: "Settings", icon: IoSettings },
];

const Navbar = ({ isExpanded, toggleSidebar }) => {
  const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setActive(index);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div className={`fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white ${isExpanded ? 'w-56' : 'w-16'} md:transition-width`}>
      <div className='mb-8 flex justify-between items-center'>
        <img src='/logo.png' alt='logo' className={`transition-width ${isExpanded ? 'w-28' : 'w-8'}`} />
      </div>

      <ul className='mt-6 space-y-6'>
        {Links.map((link, index) => (
          <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${active === index ? "bg-indigo-100 text-indigo-500" : "text-gray-500"}`}>
            <Link to={link.path} className='flex justify-center items-center md:space-x-5' onClick={() => handleClick(index)}>
              <span>{link.icon()}</span>
              <span className={`text-sm text-gray-500 ${isExpanded ? ' md:flex md:gap-3' : 'hidden'}`}>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button 
        onClick={toggleSidebar} 
        className={`p-2 mt-40 ${isExpanded ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} md:flex items-center justify-center`}
      >
        <BiCollapse size={24} color='#4f46e5'/>
      </button>
    </div>
  );
}

export default Navbar;
