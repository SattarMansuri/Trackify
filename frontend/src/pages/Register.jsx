import Logo from '../../public/icons/Logo'
import { useForm } from 'react-hook-form'
import { MoonLoader } from "react-spinners"
import Dropdown from '../../public/icons/Dropdown';
import { useState } from 'react';
import { registerUser } from '../apis/auth';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate()
  const countries = ["China", "India", "United States", "Indonesia", "Pakistan", "Nigeria", "Brazil", "Bangladesh", "Russia", "Mexico", "Ethiopia", "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran", "Germany", "Thailand", "United Kingdom"];
const [selected, setSelected] = useState("")
     const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitForm = async (data) =>{
    const response = await registerUser(data)
    console.log(response)
      if(response?.success === true){
    localStorage.setItem('firstName', response.firstName)
    localStorage.setItem('lastName', response.lastName)
    localStorage.setItem('country', response.country)
       localStorage.setItem('token', response.token)
       localStorage.setItem('email', response.email)
       navigate("/dashboard")
    setTimeout(()=>{
       toast.success(response.message)
    }, 1500)
  }else{
    toast.error(response.message)
  }
  }
  return (
 <main className="flex h-screen">
   <Toaster />
        <section className="w-1/2 md:flex hidden items-center justify-center bg-gray-300 pl-20">
          <Logo height='350' width='600' />
        </section>
         <section className="flex flex-col items-center justify-center md:w-1/2 w-full">
              <div className="md:hidden block ml-20">
          <Logo height='90' width='280' />
        </div>
              <h1 className="2xl:text-8xl lg:text-6xl sm:text-4xl text-2xl font-semibold 2xl:mb-10 lg:mb-7 md:mb-5 mb-4">
                Register
                </h1>
              <form onSubmit={handleSubmit(submitForm)} className="flex flex-col xl:gap-12 lg:gap-10 gap-9 sm:px-0 px-4">
                <div className="flex gap-4">
               <div className='relative'>
                <div className={`relative border-[1px] h-12 rounded-sm flex items-center ${errors.firstName && 'border-red-600'}`}>
          <input
            type="text"
            id="firstName"
            name='firstName'
            placeholder=" "
             {...register('firstName', 
            {
              required: {value: true, message: "First Name is required"},
              minLength: {value: 2, message: "Minimum length should be at least 2 characters"},
              pattern: {value: /^[A-Z][a-z]{1,29}$/, message: "First Name must start with a Capital letter"}
            }
          )}
            className="peer xl:w-60 lg:w-52 md:w-44 w-full h-10 placeholder-transparent bg-transparent outline-none pl-3"
          />
          <label
            htmlFor="firstName"
            className="absolute left-3 -z-10 bg-white px-0.5 text-gray-400 transition-all text-lg duration-300 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-focus:z-10 peer-focus:left-1 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:left-1 peer-[&:not(:placeholder-shown)]:z-10">
            First Name
          </label>
        </div>
        {errors.firstName && <p className='absolute mt-1.5 text-sm text-red-600'>{errors.firstName.message}</p>}
               </div>
          <div className='relative'>
            <div className={`relative border-[1px] h-12 rounded-sm flex items-center ${errors.lastName && 'border-red-600'}`}>
          <input
            type="text"
            id="lastName"
            name='lastName'
            placeholder=" "
             {...register('lastName', 
            {
              required: {value: true, message: "Last Name is required"},
              minLength: {value: 2, message: "Minimum length should be at least 2 characters"},
              pattern: {value: /^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/, message: "No numeric value"}
            }
          )}
            className="peer xl:w-60 lg:w-52 md:w-44 w-full h-10 placeholder-transparent bg-transparent outline-none pl-3"
          />
          <label
            htmlFor="lastName"
            className="absolute left-3 -z-10 bg-white px-0.5 text-gray-400 transition-all text-lg duration-300 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-focus:z-10 peer-focus:left-1 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:left-1 peer-[&:not(:placeholder-shown)]:z-10">
            Last Name
          </label>
        </div>
         {errors.lastName && <p className='absolute mt-1.5 text-sm text-red-600'>{errors.lastName.message}</p>}
          </div>
        </div>
        <div className='relative'>
    <div className={`relative border-[1px] h-12 xl:w-[496px] lg:w-[432px] md:w-[368px] w-full rounded-sm flex items-center ${errors.productSelect && ' border-red-600'}`}>
    <select
    name="country"
    id="country"
    {...register('country', 
      {
        required: {value: true, message: "Please choose an option"}
      }
    )}
    value={selected}
    onChange={(e) => setSelected(e.target.value)}
    className={`bg-grey-0 pl-3 h-10 outline-none w-full appearance-none ${selected ? "text-dark" : "text-[#9A9A9A]"}`}
    >
      <option value="" disabled>-- Select a country --</option>
     {
        countries.map((country)=>(
            <option key={country} className='text-dark' value={`${country}`}>{country}</option>
        ))
     }
     </select>
      <Dropdown className="absolute top-5 right-2" />
          </div>
           {errors.country && <p className='absolute mt-1.5 text-sm text-red-600'>{errors.country.message}</p>}
        </div>
        <div className='relative'>
           <div className={`relative border-[1px] h-12 rounded-sm flex items-center ${errors.email && 'border-red-600'}`}>
          <input
            type="text"
            id="email"
            name='email'
            placeholder=" "
             {...register('email', 
            {
              required: {value: true, message: "Email address is required"},
              minLength: {value: 6, message: "Minimum length should be at least 6  characters"},
              pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email (someone@example.com)"}
            }
          )}
            className="peer xl:w-[496px] lg:w-[432px] md:w-[368px] w-full h-10 placeholder-transparent bg-transparent outline-none pl-3"
          />
          <label
            htmlFor="email"
            className="absolute left-3 -z-10 bg-white px-0.5 text-gray-400 transition-all text-lg duration-300 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-focus:z-10 peer-focus:left-1 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:left-1 peer-[&:not(:placeholder-shown)]:z-10">
            Email
          </label>
        </div>
       {errors.email && <p className='absolute mt-1.5 text-sm text-red-600'>{errors.email.message}</p>}
        </div>
     <div className='relative mb-4'>
         <div className={`relative border-[1px] h-12 rounded-sm flex items-center ${errors.password && 'border-red-600'}`}>
          <input
            type="password"
            id="password"
            name='password'
            placeholder=" "
            {...register('password',
              {
                required: {value: true, message: 'Password is required'},
                minLength: {value: 8, message: 'Minimum length should be at least 8 characters'},
                pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/, message: 'Password should include uppercase, lowercase, number, and special character'}
              }
            )}
            className="peer xl:w-[496px] lg:w-[432px] md:w-[368px] w-full h-10 placeholder-transparent bg-transparent outline-none pl-3"
          />
          <label
            htmlFor="password"
            className="absolute left-3 -z-10 bg-white px-0.5 text-gray-400 transition-all text-lg duration-300 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-focus:z-10 peer-focus:left-1 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:left-1 peer-[&:not(:placeholder-shown)]:z-10">
            Password
          </label>
        </div>
          {errors.password && <p className='absolute mt-1.5 text-sm text-red-600'>{errors.password.message}</p>}
     </div>
        <button disabled={isSubmitting} className={`xl:w-[496px] lg:w-[432px] md:w-[368px] ${isSubmitting ? 'bg-gray-300' : 'bg-[#10B981]'} w-full font-semibold text-lg text-white h-12 lg:rounded-4xl rounded-3xl cursor-pointer hover:bg-[#10b981ac] flex justify-center items-center`}>
          { 
          isSubmitting ?  <MoonLoader size={30} color='#10B981' /> : 'Submit'
          }
        </button>
      </form>
              <p className="mt-5">
                Already have an account? <Link to='/login'>Login</Link>
              </p>
         </section>
    </main>
  )
}

export default Register