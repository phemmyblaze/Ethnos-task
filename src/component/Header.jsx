import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { MdNightlight } from "react-icons/md";

const Header = ({ toggleSidebar, toggleDarkMode }) => {
  
  return (
    <div className={`${toggleDarkMode && "dark"}`}>
    <div className='flex justify-between items-center px-5 py-2'>
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-2xl text-gray-600" onClick={toggleSidebar}>
          <GiHamburgerMenu size={32} color='#4f46e5' />
        </button>
        <div className="hidden md:block rounded-[4px]">
          <h1 className='font-bold text-2xl'>Welcome back,</h1>
          <p className='text-indigo-600 font-bold'>Mary Jane</p>
        </div>
      </div>

      <div className='flex space-x-5 items-center ml-32 md:ml-0'>
        <div  onClick={toggleDarkMode}>
          {toggleDarkMode? <CiLight size={32} /> : <MdNightlight size={32}/>}
        </div>
        
      <div className="relative hidden md:flex md:justify-end items-center w-[200px] h-[40px] rounded-[4px] px-4">
          <CiSearch size={20} className="absolute left-5 text-indigo-500" />
          <input
            type="text"
            placeholder="Search"
            // value={search}
            // onChange={handleSearch}
            className="pl-8 w-full h-full border-2 outline-none py-5 text-[14px] rounded-lg bg-indigo-100/30 text-indigo-500 focus:outline-0 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <button className='flex relative text-2xl text-gray-600'>
          <IoMdNotifications size={32} />
          <span className='absolute top-0 right-0 -mt-1 flex justify-center items-center bg-indigo-600 text-white font-serif text-[10px] w-5 h-5 rounded-full border-2 border-white'>9</span>
        </button>
        <img src="/profile.png" alt='profile' width={40} height={40} className='rounded-full' />
      </div>
    </div>
    </div>
  );
};

export default Header;
