import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md"
import { deleteTask, getAllTasks } from '../apis/task'
import MyStore from '../MyStore'
import toast, { Toaster } from 'react-hot-toast'
import TaskModal from './TaskModal'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TaskCard = ({id,title, createdAt, deadline, status, about}) => {
     const [delTask, setDelTask] = useState(false)
     const [isModalOpen, setIsModalOpen] = useState(false);
        const deleteRef = useRef()
        const {setTaskData, setUpdateTask, loading} = useContext(MyStore)
        const closeSideMenu = (e) =>{
          if(delTask && deleteRef.current && !deleteRef.current.contains(e.target)){
            setDelTask(false)
          }
        }
         const deleteHandle = async (id) =>{
       const response = await deleteTask(id)
      if(response.status = 200){
        setTaskData(await getAllTasks())
        setTimeout(()=>{
           toast.success('Task Deleted successfully')
        }, 1000)
       return <Toaster />
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
     <div className='bg-white flex flex-col justify-between max-w-96 lg:rounded-2xl rounded-xl overflow-hidden py-8 px-5 relative hover:bg-gray-200 transition-colors shadow font-poppins'>
      { isModalOpen &&
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      }
          <MdDelete onClick={()=>setDelTask(true)} className="absolute right-2 top-2 text-2xl cursor-pointer text-red-600" />
            {
              delTask && <div ref={deleteRef} className="bg-white absolute z-50 flex flex-col gap-2 border-[1px] rounded-b-xl rounded-tl-xl shadow p-3 max-w-54 right-6 top-6">
                <p className="mb-2">You Sure you want to delete this Task?</p>
                <button onClick={()=>deleteHandle(id)} className="h-8 w-full bg-red-600 rounded-sm hover:bg-red-300 font-bold text-white transition-colors cursor-pointer">Yes, Delete</button>
                <button onClick={()=>setDelTask(false)} className="h-8 w-full bg-green-600 rounded-sm hover:bg-green-300 font-bold text-white transition-colors cursor-pointer">Cancel</button>
              </div>
            }
           <div>
            <h3 className='font-medium xl:text-2xl md:text-xl text-lg mb-2'>
            {title}
           </h3>
           <p className='xl:text-lg md:text-base textsm text-gray-500'>
           created at: {createdAt}
           </p>
        <div className='flex items-center gap-2'>
         <p className='xl:text-lg md:text-base textsm text-gray-500'>
           Deadline:
         </p>
         <p className='xl:text-lg md:text-base textsm'>
          {deadline}
         </p>
        </div>
        <p className='xl:text-lg md:text-base textsm text-gray-500'>
           status: <span className='text-black'>{status}</span>
         </p>
            <div className="flex flex-col gap-2 mb-3">
          <h3 className="xl:text-lg md:text-base textsm text-gray-500 -mb-3">
            Task description:
          </h3>
          <p className="md:text-base text-sm">
            {about}
          </p>
         </div>
           </div>
         <button onClick={()=> {
        setIsModalOpen(true)
         setUpdateTask({id,title, createdAt, deadline, status, about})
      }} className="w-full hover:bg-[#10b98192] bg-[#10B981] h-10 rounded-sm cursor-pointer transition-colors text-xl font-bold text-white hover">Edit</button>
        </div>
  )
}

export default TaskCard