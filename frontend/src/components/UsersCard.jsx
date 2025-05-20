import { TbReportAnalytics } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { MdDelete } from "react-icons/md"
import { useContext, useEffect, useRef, useState } from "react";
import { deleteUser, getAllUsers } from "../apis/user";
import toast, { Toaster } from 'react-hot-toast';
import MyStore from "../MyStore";
import UserModal from '../components/UserModal'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UsersCard = ({id, firstName, lastName, role, mailId, projects, country, about}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delUser, setDelUser] = useState(false)
    const {setUserData, setUpdateUser, loading} = useContext(MyStore)
      const deleteRef = useRef()
      const closeSideMenu = (e) =>{
        if(delUser && deleteRef.current && !deleteRef.current.contains(e.target)){
          setDelUser(false)
        }
      }
      const deleteHandle = async (id) =>{
       const response = await deleteUser(id)
      if(response.status = 200){
        setUserData(await getAllUsers())
        setTimeout(()=>{
           toast.success('Task Deleted successfully')
        }, 1000)
      }
      }
      useEffect(()=>{
        document.addEventListener('mousedown', closeSideMenu)
      })

        if (loading) {
          return (
            <div className="bg-white p-5 rounded-xl shadow max-w-96 w-full">
              <Skeleton height={30} width={200} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={180} />
              <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} circle height={40} width={40} />
                ))}
              </div>
              <Skeleton height={60} className="mt-4" />
              <Skeleton height={40} width="100%" className="mt-4" />
            </div>
          );
        }

  return (
    <div className='md:px-8 md:py-6 px-6 py-4 bg-white flex flex-col justify-between gap-10 max-w-96 rounded-2xl shadow font-poppins relative overflow-hidden hover:bg-gray-200 transition-colors'>
          {
      isModalOpen && <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    }
      <Toaster />
       <MdDelete onClick={()=>setDelUser(true)} className="absolute right-2 top-2 text-2xl cursor-pointer text-red-600" />
              {
                delUser && <div ref={deleteRef} className="bg-white absolute  flex flex-col gap-2 border-[1px] rounded-b-xl rounded-tl-xl shadow p-3 max-w-54 right-6 top-6">
                  <p className="mb-2">You Sure you want to delete this Project?</p>
                  <button onClick={()=>deleteHandle(id)} className="h-8 w-full bg-red-600 rounded-sm hover:bg-red-300 font-bold text-white transition-colors cursor-pointer">Yes, Delete</button>
                  <button onClick={()=>setDelUser(false)} className="h-8 w-full bg-green-600 rounded-sm hover:bg-green-300 font-bold text-white transition-colors cursor-pointer">Cancel</button>
                </div>
              }
    <div className="flex flex-col gap-5">
      <div className='flex items-start gap-3'>
      <div className="min-h-14 min-w-14 max-h-14 max-w-14 rounded-full bg-gray-300 flex justify-center items-center text-xl font-semibold">
        {`${firstName.charAt(0)}${lastName.charAt(0)}`}
      </div>
       <div className='flex flex-col'>
         <h3 className='text-xl font-medium'>
            {`${firstName} ${lastName}`}
         </h3>
         <p className="md:text-base text-sm">
            {mailId}
         </p>
       </div>
      </div>
      <p className="md:text-lg text-base">{role}</p>
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-1.5'>
       <TbReportAnalytics className="md:text-xl text-lg"/>
       <p className='md:text-lg text-base'>
        {projects.length ? projects.length : '0'} Projects
       </p>
      </div>
      <div className='flex items-center gap-1.5'>
       < GiWorld className="md:text-xl text-lg" />
       <p className='md:text-lg text-base'>
        {country}
       </p>
      </div>
    </div>
     <p className="md:text-base text-sm">
        {about}
      </p>
    </div>
    <div>
        <button onClick={()=>{
          setIsModalOpen(true)
          setUpdateUser({id, firstName, lastName, role, mailId, projects, country, about})
          }} className="w-full hover:bg-[#10b98192] bg-[#10B981] h-10 rounded-sm cursor-pointer transition-colors text-xl font-bold text-white hover">Edit</button>
    </div>
    </div>
  )
}

export default UsersCard