import React, { useContext, useEffect, useRef, useState } from 'react';
import Cross from '../../public/icons/Cross';
import { useForm } from 'react-hook-form'
import { FaPlus } from "react-icons/fa";
import { MoonLoader } from "react-spinners"
import { createProject, getAllProjects, projectUpdate } from '../apis/project';
import toast, { Toaster } from 'react-hot-toast';
import MyStore from '../MyStore';

const ProjectModal = ({ isOpen, onClose }) => {
  const {setProjectData, updateProject, setUpdateProject, userData} = useContext(MyStore)
       const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm(
   {
     defaultValue: {
      assignTo: []
    }
   }
  )
    const [selectedOptions, setSelectedOptions] = useState([])
  const [currentSelect, setCurrentSelect] = useState('')

const handleAdd = () => {
  if (currentSelect && !selectedOptions.includes(currentSelect)) {
    const updated = [...selectedOptions, currentSelect]
    setSelectedOptions(updated)
    setValue("assignTo", updated)
    setCurrentSelect("")
  }
}
const handleRemove = (item) => {
  const updated = selectedOptions.filter(option => option !== item)
  setSelectedOptions(updated)
  setValue("assignTo", updated)
}
  const submitForm = async (data) =>{
    console.log(data)
    if(updateProject.id){
      const response = await projectUpdate(updateProject.id, data)
      if(response?.success === true){
     setProjectData(await getAllProjects())
    setTimeout(()=>{
       toast.success(response.message)
          onClose()
          reset()
          setUpdateProject({})
    }, 1500)
  }else{
    toast.error(response.message)
  }
    }else{
    const response = await createProject(data)
    if(response?.success === true){
     setProjectData(await getAllProjects())
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
  const modalContentRef = useRef(null)

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose()
      reset()
      setUpdateProject({})
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
  }, [isOpen])

useEffect(() => {
  setValue("assignTo", selectedOptions)
  setCurrentSelect("")
}, [selectedOptions, setValue])
useEffect(() => {
  if (updateProject?.assignTo?.length) {
    setSelectedOptions([...updateProject.assignTo])
  } else {
    setSelectedOptions([])
  }
  setCurrentSelect("")
}, [updateProject])
  return (
    <section>
      <Toaster />
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } z-40`}/>
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}>
        <div ref={modalContentRef}
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
            placeholder="Enter Title here"
            defaultValue={updateProject.title || ''}
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
          <label htmlFor="company" className='text-start md:text-lg xs:text-base text-sm'>Company Name</label>
          <input
            type="text"
            name='company'
            placeholder="Enter Company Name"
             defaultValue={updateProject.company || ''}
             {...register('company', 
            {
              required: {value: true, message: "Company Name is required"},
              minLength: {value: 3, message: "Minimum length should be at least 3 characters"},
            }
          )}
            className={`xl:w-60 lg:w-52 md:w-44 w-full h-10 border-[1px] rounded-sm bg-transparent outline-none pl-3 ${errors.company ?'border-red-600' : 'border-black'}`}
          />
         {errors.company && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.company.message}</p>}
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
       <div className="flex flex-col gap-1 xl:w-[496px] lg:w-[432px] md:w-[368px] w-full">
        <label htmlFor="assignTo" className='text-start md:text-lg xs:text-base text-sm'>Assign To</label>
      <div className="flex gap-2 items-center">
        <select
          value={currentSelect}
          onChange={(e) => setCurrentSelect(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[calc(100%-2.5rem)] "
        >
          <option disabled value="">-- Select Assignees --</option>
            {
        userData.map(({_id, firstName, lastName, role})=>(
        <option disabled={selectedOptions.includes(`${firstName} ${lastName} (${role})`)} key={_id} value={`${firstName} ${lastName} (${role})`}>{`${firstName} ${lastName} (${role})`} </option>
        ))
      }
        </select>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white p-2 rounded disabled:opacity-50 w-10 cursor-pointer disabled:cursor-not-allowed"
          disabled={!currentSelect}
        >
          <FaPlus className='text-2xl' />
        </button>
      </div>
      <div className="mt-1 relative flex gap-2 flex-wrap max-h-20 overflow-y-scroll scrollbar-hidden">
        {selectedOptions.map((item) => (
          <div key={item} className="flex items-center justify-between bg-gray-200 py-1.5 px-3 relative  rounded-b-sm rounded-tl-sm">
            <span>{item.split(" (")[0]}</span>
            <button
              onClick={() => handleRemove(item)}
              className="absolute right-0 -top-1.5 cursor-pointer text-red-500 font-semibold"
            >
             x
            </button>
          </div>
        ))}
      </div>
    </div>
        <div className='flex flex-col gap-1 relative'>
            <label htmlFor="about" className='text-start md:text-lg xs:text-base text-sm'>About Project</label>
            <textarea name="about" id=""  defaultValue={updateProject.about || ''}
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

export default ProjectModal
