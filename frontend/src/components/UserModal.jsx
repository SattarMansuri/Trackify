import React, { useContext, useEffect, useRef, useState } from 'react';
import Cross from '../../public/icons/Cross';
import { MoonLoader } from "react-spinners"
import { useForm } from 'react-hook-form'
import Dropdown from '../../public/icons/Dropdown';
import { createUser, getAllUsers, userUpdate } from '../apis/user';
import toast, { Toaster } from 'react-hot-toast';
import MyStore from '../MyStore';
import { FaPlus } from 'react-icons/fa';

const UserModal = ({ isOpen, onClose }) => {
   const countries = ["China", "India", "United States", "Indonesia", "Japan", "Nigeria", "Brazil", "Bangladesh", "Russia", "Mexico", "Ethiopia", "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran", "Germany", "Thailand", "United Kingdom"];
   const jobRoles = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Project Manager", "Product Manager", "Data Scientist", "DevOps Engineer", "QA Engineer", "Mobile App Developer", "Cloud Architect", "Cybersecurity Analyst", "Machine Learning Engineer", "AI Researcher", "Systems Analyst", "Business Analyst", "Technical Writer", "Database Administrator", "Network Engineer", "Game Developer", "IT Support Specialist", "Scrum Master", "Solution Architect", "Web Designer", "Blockchain Developer", "Site Reliability Engineer", "SEO Specialist", "AR/VR Developer", "Embedded Systems Engineer"];
  const {setUserData, updateUser, setUpdateUser, projectData} = useContext(MyStore)
    const [selected, setSelected] = useState(updateUser.country || "")
  const [role, setRole] = useState(updateUser.role || "")
         const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        getValues,
      } = useForm();
      const submitForm = async (data) =>{
        console.log(data)
        if(updateUser.id){
          const response = await userUpdate(updateUser.id, data)
          if(response?.success === true){
          setUserData(await getAllUsers())
    setTimeout(()=>{
       toast.success(response.message)
          onClose()
          reset()
          setUpdateUser({})
    }, 1500)
  }else{
    toast.error(response.message)
  }
        }else{
        const response = await createUser(data)
         if(response?.success === true){
          setUserData(await getAllUsers())
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
 const [selectedOptions, setSelectedOptions] = useState([])
  const [currentSelect, setCurrentSelect] = useState('')

const handleAdd = () => {
  if (currentSelect && !selectedOptions.includes(currentSelect)) {
    const updated = [...selectedOptions, currentSelect]
    setSelectedOptions(updated)
    setValue("projects", updated)
    setCurrentSelect("")
  }
}
const handleRemove = (item) => {
  const updated = selectedOptions.filter(option => option !== item)
  setSelectedOptions(updated)
  setValue("projects", updated)
}
  const modalContentRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose()
      reset()
      setUpdateUser({})
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
  setValue("projects", selectedOptions)
  setCurrentSelect("")
}, [selectedOptions, setValue])
useEffect(() => {
  if (updateUser?.projects?.length) {
    setSelectedOptions([...updateUser.projects])
  } else {
    setSelectedOptions([])
  }
  setCurrentSelect("")
}, [updateUser])

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
           <div className="flex gap-4">
        <div className='flex flex-col gap-1 relative'>
            <label htmlFor="title" className='text-start md:text-lg xs:text-base text-sm'>First Name</label>
          <input
            type="text"
            id="firstName"
            name='firstName'
            defaultValue={updateUser.firstName || ''}
            placeholder="Enter First Name"
             {...register('firstName', 
            {
              required: {value: true, message: "First Name is required"},
              minLength: {value: 2, message: "Minimum length should be at least 2 characters"},
              pattern: {value: /^[A-Z][a-z]{1,29}$/, message: "First Name must start with a Capital letter"}
            }
          )}
            className={`xl:w-60 lg:w-52 md:w-44 w-full h-10 rounded-sm bg-transparent border-[1px] outline-none px-3 ${errors.firstName ? 'border-red-600' : 'border-black'}`}
          />
        {errors.firstName && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.firstName.message}</p>}
               </div>
             <div className='flex flex-col gap-1 relative'>
            <label htmlFor="title" className='text-start md:text-lg xs:text-base text-sm'>Last Name</label>
          <input
            type="text"
            name='lastName'
            placeholder="Enter Last Name"
            defaultValue={updateUser.lastName || ''}
             {...register('lastName', 
            {
              required: {value: true, message: "Last Name is required"},
              minLength: {value: 2, message: "Minimum length should be at least 2 characters"},
              pattern: {value: /^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/, message: "No numeric value"}
            }
          )}
            className={`xl:w-60 lg:w-52 md:w-44 w-full h-10 border-[1px] rounded-sm bg-transparent outline-none px-3 ${errors.lastName ? 'border-red-600' : 'border-black'}`}
          />
        {errors.lastName && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.lastName.message}</p>}
               </div>
        </div>
             <div className='flex flex-col gap-1 relative'>
              <label htmlFor="title" className='text-start md:text-lg xs:text-base text-sm'>Email Address</label>
              <input
            type="text"
            name='mailId'
            placeholder="Enter mail Id"
            defaultValue={updateUser.mailId || ''}
             {...register('mailId', 
            {
            required: {value: true, message: "Email address is required"},
              minLength: {value: 6, message: "Minimum length should be at least 6  characters"},
              pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email (someone@example.com)"},
            }
          )}
            className={`xl:w-[496px] lg:w-[432px] md:w-[368px] w-full h-10 border-[1px] rounded-sm bg-transparent outline-none pl-3 ${errors.mailId ? 'border-red-600' : 'border-black'}`}
          />
             {errors.mailId && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.mailId.message}</p>}
             </div>
             <div className="flex xs:flex-row flex-col xs:gap-4 gap-8">
              <div className='flex flex-col gap-1 relative'>
          <label htmlFor="company" className='text-start md:text-lg xs:text-base text-sm'>Choose Country</label>
            <select
            {
              ...register('country', {
                required: {value: true, message: 'Country required'}
              })
            }
     name="country"
        value={selected}
    onChange={(e) => setSelected(e.target.value)}
    className={`bg-grey-0 pl-3 h-10 rounded-sm outline-none xl:w-60 lg:w-52 md:w-44 w-full appearance-none border-[1px] ${errors.country ? 'border-red-600' : 'border-black'}`}
    >
      <option value="" disabled>-- Choose Country --</option>
      {
        countries.map((country)=>(
            <option key={country} className='text-dark' value={`${country}`}>{country}</option>
        ))
     }
     </select>
      <Dropdown className="absolute xs:top-12 top-10 right-2" />
         {errors.country && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.country.message}</p>}
          </div>
             <div className='flex flex-col gap-1 relative'>
          <label htmlFor="company" className='text-start md:text-lg xs:text-base text-sm'>Task Status</label>
            <select
            {
              ...register('role', {
                required: {value: true, message: 'Role required'}
              })
            }
    name="role"
        value={role}
    onChange={(e) => setRole(e.target.value)}
    className={`bg-grey-0 pl-3 h-10 rounded-sm outline-none xl:w-60 lg:w-52 md:w-44 w-full appearance-none border-[1px] ${errors.role ? 'border-red-600' : 'border-black'}`}
    >
      <option value="" disabled>-- Choose Role --</option>
      {
        jobRoles.map((job)=>(
            <option key={job} className='text-dark' value={`${job}`}>{job}</option>
        ))
     }
     </select>
      <Dropdown className="absolute xs:top-12 top-10 right-2" />
         {errors.role && <p className='absolute top-[100%] xs:text-sm text-xs text-red-600'>{errors.role.message}</p>}
          </div>
        </div>
    <div className="flex flex-col gap-1 xl:w-[496px] lg:w-[432px] md:w-[368px] w-full">
        <label htmlFor="projects" className='text-start md:text-lg xs:text-base text-sm'>Assign Projects</label>
      <div className="flex gap-2 items-center">
        <select
          value={currentSelect}
          onChange={(e) => setCurrentSelect(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[calc(100%-2.5rem)] "
        >
          <option disabled value="">-- Select Projects --</option>
            {
         projectData.map(({_id, title, company})=>(
        <option disabled={selectedOptions.includes(`${title} (${company})`)} key={_id} value={`${title} (${company})`}>{`${title} (${company})`} </option>
        ))
      }
        </select>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white p-2 rounded disabled:opacity-50 w-10 cursor-pointer disabled:cursor-not-allowed"
          disabled={!currentSelect ||  selectedOptions.length >= 4}
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
            <label htmlFor="about" className='text-start md:text-lg xs:text-base text-sm'>About</label>
            <textarea name="about" id="" defaultValue={updateUser.about || ''}
            {
              ...register('about', {
                required: {value: true, message: 'Please add a short summary'},
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

export default UserModal
