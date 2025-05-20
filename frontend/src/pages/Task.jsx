import { IoCreateOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import TaskModal from "../components/TaskModal";
import MyStore from "../MyStore";
import TaskCard from "../components/TaskCard";

const Task = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const {taskData, loading} = useContext(MyStore)
  return (
    <main className='flex flex-col w-full bg-gray-100 font-poppins'>
       <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
     <section className='flex xs:flex-row flex-col-reverse xs:justify-end items-center bg-white py-5 px-5 font-poppins'> 
    <button onClick={() => setIsModalOpen(true)} className='p-3 h-[54px] relative hover:border-[1px] border-gray-200 md:w-60 xs:w-48 flex items-center gap-2 cursor-pointer justify-center shadow w-full xs:border-0 border-[1px]'>
      <IoCreateOutline className='text-xl font-semibold' /> <h5>Create a Task</h5>
    </button>
    </section>
    <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:my-14 lg:my-12 md:my-10 my-8 grid xl:grid-cols-3 md:grid-cols-2 md:justify-between justify-center md:gap-x-5 gap-10 md:items-stretch items-center'>
       {
          loading ?
          [...Array(8)].map((_, i) => <TaskCard key={i} loading={true} />):

        taskData.length ? taskData.map(({_id, title, createdAt, time, status, about})=>(
           <TaskCard key={_id} id={_id} title={title} createdAt={createdAt} deadline={time} status={status} about={about} />
        )) : <p className='text-2xl font-medium text-center'>No Current Task</p>
       }
    </section>
   </main>
  )
}

export default Task