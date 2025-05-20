import logo from '../../public/logo.png'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FaTasks, FaUsers } from "react-icons/fa";
import {NavLink} from "react-router-dom"
import { useState } from 'react';
import LogoutModal from './LogoutModal';

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
   <nav className='py-9 px-6 xl:min-w-64 md:min-w-52 md:max-w-52 h-screen lg:flex flex-col hidden justify-between shadow-[5px_0_10px_rgba(0,0,0,0.1)] sticky top-0'>
   <div className="flex flex-col gap-6 mt-10">
    <div className='flex items-center gap-2 mb-3'>
       <img src={logo} alt="Trackify logo" className='xl:h-12 xl:w-12 h-10 w-10 rounded-full' />
       <h2 className='xl:text-4xl text-3xl font-bold text-[#10B981]'>Trackify</h2>
  </div>
  <NavLink to='/dashboard' className='flex items-center gap-1 py-2 px-2.5 hover:bg-[#80d2b7a5] rounded-sm cursor-pointer'>
    <MdOutlineSpaceDashboard className='md:text-3xl' />
    <h3 className='md:text-2xl text-xl font-medium'>Dashboard</h3>
  </NavLink>
   <NavLink to='/project' className='flex items-center gap-2 py-2 px-2.5 hover:bg-[#80d2b7a5] rounded-sm cursor-pointer'>
    <TbReportAnalytics className='md:text-3xl' />
    <h3 className='md:text-2xl text-xl font-medium'>Project</h3>
  </NavLink>
   <NavLink to='/task' className='flex items-center gap-2 py-2 px-2.5 hover:bg-[#80d2b7a5] rounded-sm cursor-pointer'>
    <FaTasks className='md:text-[25px]' />
    <h3 className='md:text-2xl text-xl font-medium'>Task</h3>
  </NavLink>
   <NavLink to='/user' className='flex items-center gap-2 py-2 px-2.5 hover:bg-[#80d2b7a5] rounded-sm cursor-pointer'>
    <FaUsers className='md:text-3xl' />
    <h3 className='md:text-2xl text-xl font-medium'>Users</h3>
  </NavLink>
  </div>
    <div>
      <button onClick={() => setIsModalOpen(true)} className="w-full h-11 rounded-lg bg-gray-300 hover:bg-gray-100 hover:text-black text-white cursor-pointer font-bold">Log Out</button>
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    </nav>
  )
}

export default Sidebar