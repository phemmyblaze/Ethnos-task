import React from 'react'
import Header from "./Header"
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className='flex'>
        <Navbar/>
        <div className='w-full ml-16 md:ml-56'>
            <Header/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout