import Header from '../components/Header'
import Search from '../../public/icons/Search'
import { IoCreateOutline } from "react-icons/io5";
import { useContext, useState } from 'react';
import ProjectModal from '../components/ProjectModal';
import ProjectCard from '../components/ProjectCard'
import MyStore from '../MyStore';

const Project = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const {projectData, loading} = useContext(MyStore)
  return (
   <main className='flex flex-col w-full bg-gray-100 font-poppins'>
    <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <section className='flex xs:flex-row flex-col-reverse xs:justify-end items-center bg-white py-5 px-5 font-poppins'>
    <button onClick={() => setIsModalOpen(true)} className='p-3 h-[54px] relative hover:border-[1px] border-gray-200 md:w-60 xs:w-48 flex items-center gap-2 cursor-pointer justify-center shadow w-full xs:border-0 border-[1px]'>
      <IoCreateOutline className='text-xl font-semibold' /> <h5>Create a Project</h5>
    </button>
    </section>
    <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:my-14 lg:my-12 md:my-10 my-8 grid xl:grid-cols-3 md:grid-cols-2 md:justify-between justify-center md:gap-x-5 gap-10 md:items-stretch items-center'>
     {
     loading ? 
      [...Array(8)].map((_, i) => <ProjectCard key={i} loading={true} />)
     :
        projectData.map(({_id,title, company, date, assignTo, about, createdAt})=>(
        <ProjectCard key={_id} id={_id} title={title} company={company} deadline={date} assignTo={assignTo} about={about} />
      ))
     }
    </section>
   </main>
  )
}

export default Project