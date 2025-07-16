import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {
  const user = {
    firstName: 'Tejas',
    lastName: 'Divase',
    imageUrl: assets.profile,
  }

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ]

  return (
    <div className='h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-full max-w-60 border-r border-gray-800 bg-[#18141c]'>
      <div className='flex flex-col items-center gap-2 mb-6'>
        <img src={user.imageUrl} alt='profile' className='w-16 h-16 rounded-full border-2 border-pink-500' />
        <span className='text-white font-semibold text-lg'>{user.firstName} {user.lastName}</span>
      </div>
      <div className='w-full'>
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end className={({ isActive }) =>
              `relative flex items-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-white font-medium ${
                isActive ? 'bg-pink-900/80 text-pink-400' : 'hover:text-pink-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className='w-5 h-5' />
                <span className='max-md:hidden'>{link.name}</span>
                <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive ? 'bg-pink-500' : ''}`} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar