import { useContext, useState } from 'react'
import Calendar from '../components/Calendar'
import Watch from '../components/Watch'
import MyStore from '../MyStore'
import UsersCard from '../components/UsersCard'
import TaskCard from '../components/TaskCard'
import ProjectCard from '../components/ProjectCard'

const Dashboard = () => {
  const {userData, taskData, projectData, loading} = useContext(MyStore)
  const [totalProjects] = useState(projectData.length || 'NA')
  return (
 <main className='flex flex-col w-full bg-gray-100 font-poppins'>
  <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:mt-14 lg:mt-12 md:mt-10 mt-8 flex md:justify-between justify-center md:flex-row flex-col md:gap-5 gap-10 md:items-stretch items-center'>
   <Calendar />
   <Watch />
   <div className='bg-white shadow md:py-5 xl:px-10 lg:px-5 md:px-7 p-4 flex flex-col gap-5 rounded-md xl:min-w-80 md:w-auto xs:w-96 w-full'>
    <h3 className='xl:text-3xl md:text-3xl text-4xl'>Total Projects</h3>
    <h3 className='xl:text-5xl md:text-4xl text-5xl font-medium text-center'>
    {totalProjects}
    </h3>
   </div>
  </section>
 <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:mt-14 lg:mt-12 md:mt-10 mt-8  flex flex-col sm:items-start items-center gap-8'>
    <h1 className='xl:text-5xl md:text-4xl xs:text-3xl text-2xl font-medium'>Recent User</h1>
<div className='xl:grid hidden grid-cols-3 gap-5'>
        {
          loading ?
              [...Array(3)].map((_, i) => <UsersCard key={i} loading={true} />)
              :
          userData.slice(-3).map(({_id, firstName, lastName, mailId, country, role, about, projects})=>(
          <UsersCard key={_id} id={_id} firstName={firstName} lastName={lastName} role={role} country={country} projects={projects} mailId={mailId} about={about} />
        ))
        }
</div>
<div className='sm:grid xl:hidden hidden grid-cols-2 gap-5'>
        {
          loading ?
           [...Array(2)].map((_, i) => <UsersCard key={i} loading={true} />)
              :
          userData.slice(-2).map(({_id, firstName, lastName, mailId, country, role, about, projects})=>(
          <UsersCard key={_id} id={_id} firstName={firstName} lastName={lastName} role={role} country={country} projects={projects} mailId={mailId} about={about} />
        ))
        }
</div>
<div className='sm:hidden block gap-5'>
        {
           loading ?
           [...Array(1)].map((_, i) => <UsersCard key={i} loading={true} />)
              :
          userData.slice(-1).map(({_id, firstName, lastName, mailId, country, role, about, projects})=>(
          <UsersCard key={_id} id={_id} firstName={firstName} lastName={lastName} role={role} country={country} projects={projects} mailId={mailId} about={about} />
        ))
        }
</div>
 </section>
 <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:mt-14 lg:mt-12 md:mt-10 mt-8  flex flex-col sm:items-start items-center gap-8'>
<h1 className='xl:text-5xl md:text-4xl xs:text-3xl text-2xl font-medium'>Recent Tasks</h1>
<div className='xl:grid hidden grid-cols-3 gap-5'>
        {
                loading ?
          [...Array(3)].map((_, i) => <TaskCard key={i} loading={true} />)
          :
          taskData.slice(-3).map(({_id, title, createdAt, time, status, about})=>(
           <TaskCard key={_id} id={_id} title={title} createdAt={createdAt} deadline={time} status={status} about={about} />
        ))
        }
</div>
<div className='sm:grid xl:hidden hidden grid-cols-2 gap-5'>
        {
                loading ?
          [...Array(2)].map((_, i) => <TaskCard key={i} loading={true} />)
          :
              taskData.slice(-2).map(({_id, title, createdAt, time, status, about})=>(
           <TaskCard key={_id} id={_id} title={title} createdAt={createdAt} deadline={time} status={status} about={about} />
        ))
        }
</div>
<div className='sm:hidden block gap-5'>
        {
                loading ?
          [...Array(1)].map((_, i) => <TaskCard key={i} loading={true} />)
          :
             taskData.slice(-1).map(({_id, title, createdAt, time, status, about})=>(
           <TaskCard key={_id} id={_id} title={title} createdAt={createdAt} deadline={time} status={status} about={about} />
        ))
        }
</div>
 </section>
 <section className='xl:px-10 lg:px-7 md:px-4 px-3 xl:mt-14 lg:mt-12 md:mt-10 mt-8 xl:mb-20 lg:mb-16 md:mb-14 mb-12 flex flex-col sm:items-start items-center gap-8'>
<h1 className='xl:text-5xl md:text-4xl xs:text-3xl text-2xl font-medium'>Recent Projects</h1>
<div className='xl:grid hidden grid-cols-3 gap-5'>
        { 
         loading ? 
      [...Array(3)].map((_, i) => <ProjectCard key={i} loading={true} />)
      :
          projectData.slice(-3).map(({_id,title, company, date, assignTo, about, createdAt})=>(
        <ProjectCard key={_id} id={_id} title={title} company={company} deadline={date} assignTo={assignTo} about={about} />
      ))
        }
</div>
<div className='sm:grid xl:hidden hidden grid-cols-2 gap-5'>
        {
           loading ? 
      [...Array(2)].map((_, i) => <ProjectCard key={i} loading={true} />) 
      :
        projectData.slice(-2).map(({_id,title, company, date, assignTo, about, createdAt})=>(
        <ProjectCard key={_id} id={_id} title={title} company={company} deadline={date} assignTo={assignTo} about={about} />
      ))
        }
</div>
<div className='sm:hidden block gap-5'>
        {
           loading ? 
      [...Array(1)].map((_, i) => <ProjectCard key={i} loading={true} />)
      :
    projectData.slice(-1).map(({_id,title, company, date, assignTo, about, createdAt})=>(
        <ProjectCard key={_id} id={_id} title={title} company={company} deadline={date} assignTo={assignTo} about={about} />
      ))
        }
</div>
 </section>
 </main>
  )
}

export default Dashboard