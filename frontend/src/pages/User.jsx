import React, { useContext, useState } from 'react'
import Search from '../../public/icons/Search'
import { IoCreateOutline } from "react-icons/io5";
import UserModal from '../components/UserModal';
import MyStore from '../MyStore';
import UsersCard from '../components/UsersCard';

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {userData, loading} = useContext(MyStore)
  return (
    <main className='flex flex-col w-full bg-gray-100 font-poppins'>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
     <section className='flex xs:flex-row flex-col-reverse xs:justify-end items-center bg-white py-5 px-5 font-poppins'> 
    <button onClick={() => setIsModalOpen(true)} className='p-3 h-[54px] relative hover:border-[1px] border-gray-200 md:w-60 xs:w-48 flex items-center gap-2 cursor-pointer justify-center shadow w-full xs:border-0 border-[1px]'>
      <IoCreateOutline className='text-xl font-semibold' /> <h5>Create a User</h5>
    </button>
    </section>
    <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:my-14 lg:my-12 md:my-10 my-8 grid xl:grid-cols-3 md:grid-cols-2 md:justify-between justify-center md:gap-x-5 gap-10 md:items-stretch items-center'>
      {
        loading ?
          [...Array(8)].map((_, i) => <UsersCard key={i} loading={true} />)
        :
        userData.map(({_id, firstName, lastName, mailId, country, role, about, projects})=>(
          <UsersCard key={_id} id={_id} firstName={firstName} lastName={lastName} role={role} country={country} projects={projects} mailId={mailId} about={about} />
        ))
      }
    </section>
   </main>
  )
}

export default User