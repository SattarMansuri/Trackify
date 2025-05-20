import Logo from '../../public/icons/Logo'
import { useForm } from 'react-hook-form'
import { MoonLoader } from "react-spinners"
import { userLogin } from '../apis/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate()
   const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitForm = async (data) =>{
    const response = await userLogin(data)
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
          <Logo height='100' width='170' />
        </div>
        <h1 className="2xl:text-8xl lg:text-6xl sm:text-4xl text-2xl font-semibold 2xl:mb-10 lg:mb-7 md:mb-5 mb-4">
          Login
        </h1>
       <form onSubmit={handleSubmit(submitForm)} className="flex flex-col xl:gap-12 lg:gap-10 gap-9 sm:px-0 px-4">
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
            htmlFor="password"
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
        Don't have an account? <Link to='/'>Register</Link>
      </p>
     
    </section>
    </main>
  )
}

export default Login