import React, { useContext, useEffect, useRef } from 'react';
import Cross from '../../public/icons/Cross';
import { MoonLoader } from "react-spinners"
import { useForm } from 'react-hook-form'
import Dropdown from '../../public/icons/Dropdown';
import { useState } from 'react';
import { createTask, getAllTasks, taskUpdate } from '../apis/task';
import toast, { Toaster } from 'react-hot-toast';
import MyStore from '../MyStore';

const TaskModal = ({ isOpen, onClose }) => {
  const taskStatus = ["Not Started", "In Progress", "Completed", "Blocked", "On Hold", "Cancelled", "Deferred", "Waiting for Review", "Approved", "Rejected", "Archived", "Reopened"]
  const {setTaskData, updateTask, setUpdateTask} = useContext(MyStore)
  const [status, setStatus] = useState(updateTask.status || "")
         const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
    } = useForm();
    const submitForm = async (data) =>{
     if(updateTask.id){
       const response = await  taskUpdate(updateTask.id, data)
       if(response.success === true){
        setTaskData(await getAllTasks())
    setTimeout(()=>{
       toast.success(response.message)
          onClose()
          reset()
    }, 1500)
  }else{
    toast.error(response.message)
  }
     }else{
       const response = await  createTask(data)
       if(response?.success === true){
        setTaskData(await getAllTasks())
    setTimeout(()=>{
       toast.success(response.message)
          onClose()
          reset()
    }, 1500)
  }else{
    toast.error(response.message)
  }
     }
    }
  const modalContentRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
      reset()
      setUpdateTask({})
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <section>
      <Toaster />
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } z-50`}
      />
      <div
        className={`fixed inset-0 flex items-center justify-center z-[60] transition-transform duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={modalContentRef}
          className="bg-white p-6 rounded-xl shadow-xl relative flex flex-col items-center text-center space-y-6 max-w-[95%] xs:min-w-fit min-w-[95%]"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <Cross />
          </button>
          <form  onSubmit={handleSubmit(submitForm)} action="" className='mt-5 flex flex-col gap-8 w-full'>
             <div className='flex flex-col gap-1 relative'>
              <label htmlFor="title" className='text-start md:text-lg xs:text-base text-sm'>Title</label>
              <input
            type="text"
            name='title'
            defaultValue={updateTask.title || ''}  
            placeholder="Enter Title here"
             {...register('title', 
            {
              required: {value: true, message: "Project title is required"},
              minLength: {value: 3, message: "Minimum length should be at least 3 characters"},
            }
          )}
            className={`xl:w-[496px] lg:w-[432px] md:w-[368px] w-full h-10 border-[1px] rounded-sm bg-transparent outline-none pl-3 ${errors.title ? 'border-red-600' : 'border-black'}`}
          />
             {errors.title && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.title.message}</p>}
             </div>
             <div className="flex xs:flex-row flex-col xs:gap-4 gap-8">
              <div className='flex flex-col gap-1 relative'>
          <label htmlFor="company" className='text-start md:text-lg xs:text-base text-sm'>Task Status</label>
            <select
            {
              ...register('status', {
                required: {value: true, message: 'Task Status required'}
              })
            }
            value={status}
    onChange={(e) => setStatus(e.target.value)}
    name="status"
    className={`bg-grey-0 pl-3 h-10 rounded-sm outline-none xl:w-60 lg:w-52 md:w-44 w-full appearance-none border-[1px] ${errors.status ? 'border-red-600' : 'border-black'}`}
    >
      <option value="" disabled>-- task Status --</option>
      {
         taskStatus.map((task)=>(
            <option key={task} className='text-dark' value={`${task}`}>{task}</option>
        ))
      }
     </select>
      <Dropdown className="absolute xs:top-12 top-10 right-2" />
         {errors.status && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.status.message}</p>}
          </div>
          <div className='flex flex-col gap-1 relative'>
          <label htmlFor="company" className='text-start md:text-lg xs:text-base text-sm'>Choose deadline</label>
          <input
            type="date"
            name='date'
            placeholder="Enter the Deadline"
             {...register('date', 
            {
              required: {value: true, message: "Deadline is required"},
            }
          )}
            className={`xl:w-60 lg:w-52 md:w-44 w-full h-10 bg-transparent border-[1px] rounded-sm outline-none pl-3 ${errors.date ?'border-red-600' : 'border-black'}`}
          />
         {errors.date && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.date.message}</p>}
          </div>
        </div>
        <div className='flex flex-col gap-1 relative'>
            <label htmlFor="about" className='text-start md:text-lg xs:text-base text-sm'>Task Description</label>
            <textarea name="about" id="" defaultValue={updateTask.about || ''}
            {
              ...register('about', {
                required: {value: true, message: 'Please add a project summary'},
                minLength: {value: 50, message: 'Minimum length should be at least 50 charachters'},
                maxLength: {value: 300, message: 'Maximum length should not exceed more than 300 characters'}
              })
            }
            className={`xl:w-[496px] lg:w-[432px] md:w-[368px] resize-none w-full h-24 border-[1px] rounded-sm bg-transparent outline-none px-3 py-1 ${errors.about ? 'border-red-600' : 'border-black'}`} 
            />
          {errors.about && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.about.message}</p>}
        </div>
        <button disabled={isSubmitting} className={`xl:w-[496px] lg:w-[432px] md:w-[368px] ${isSubmitting ? 'bg-gray-300' : 'bg-[#10B981]'} w-full font-semibold text-lg text-white h-12 lg:rounded-4xl rounded-3xl cursor-pointer hover:bg-[#10b981ac] flex justify-center items-center`}>
          { 
          isSubmitting ?  <MoonLoader size={30} color='#10B981' /> : 'Submit'
          }
        </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TaskModal
