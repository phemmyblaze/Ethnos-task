import React from 'react';
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ toggleSidebar }) => {
  return (
    <div className='flex justify-between items-center px-5 py-2'>
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-2xl text-gray-600" onClick={toggleSidebar}>
          <GiHamburgerMenu size={32} color='#4f46e5' />
        </button>
        <div className="hidden md:block rounded-[4px]">
          <h1 className='font-bold text-2xl text-gray-600'>Welcome back,</h1>
          <p className='text-indigo-600 font-bold'>Mary Jane</p>
        </div>
      </div>

      <div className='flex space-x-5 items-center ml-32 md:ml-0'>
        <button className='flex relative text-2xl text-gray-600'>
          <IoMdNotifications size={32} />
          <span className='absolute top-0 right-0 -mt-1 flex justify-center items-center bg-indigo-600 text-white font-serif text-[10px] w-5 h-5 rounded-full border-2 border-white'>9</span>
        </button>
        <img src="/profile.png" alt='profile' width={40} height={40} className='rounded-full' />
      </div>
    </div>
  );
};

export default Header;
