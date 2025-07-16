import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-12 h-16 border-b border-gray-800 bg-[#18141c]'>
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36 h-auto" />
      </Link>
    </div>
  )
}

export default AdminNavbar
