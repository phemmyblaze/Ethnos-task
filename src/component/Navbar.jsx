import React, { useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { IoAlbums } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Links = [
  {id:1, path:"/", name: "User", icon: FaUsers},
  {id:2, path:"/posts", name: "Posts", icon: MdOutlinePostAdd},
  {id:3, path:"/todos", name: "Todos", icon: RiTodoLine},
  {id:4, path:"/albums", name: "Albums", icon: IoAlbums},
  {id:5, path:"#", name: "Settings", icon: IoSettings},
]
const Navbar = () => {
  const [active, setactive] = useState(0)

  const handleClick = (index) => {
    setactive(index)
  }
  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>
      <div className='mb-8'>
        <img src='/logo.png' alt='logo' className='w-28 hidden md:flex'/>
        <img src='/logo.png' alt='logo' className='w-8 flex md:hidden'/>
      </div>

      <ul className='mt-6 space-y-6 '>
        {
          Links.map((link, index) => (
            <li key={index} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${active === index ? "bg-indigo-100 text-indigo-500" : ""}`}>
              <Link to={link.path} className='flex justify-center md:justify-start items-center md:space-x-5' onClick={() => handleClick(index)}>
                <span>{link.icon()}</span>            
                <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>            
                           
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Navbar