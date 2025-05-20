import Cross from '../../public/icons/Cross';
import logo from '../../public/logo.png'
import Menu from '../../public/icons/Menu'
import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import LogoutModal from './LogoutModal';
import MyStore from '../MyStore';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
      const [isModalOpen, setIsModalOpen] = useState(false);
      const {name} = useContext(MyStore)
  const sideMenuRef = useRef()
  const closeSideMenu = (e) =>{
    if(showMenu && sideMenuRef.current && !sideMenuRef.current.contains(e.target)){
      setShowMenu(false)
    }
  }
  useEffect(()=>{
    document.addEventListener('mousedown', closeSideMenu)
  })
   useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu])
  return (
    <header className='md:py-4 py-3 flex justify-between items-center bg-white shadow md:px-6 px-3 relative min-w-full'>
      {
  isModalOpen &&   <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
}
        <div className='lg:flex hidden flex-col gap-2'>
          <h3 className='font-medium xl:text-4xl lg:text-3xl text-2xl'>
            Hi, {name}
          </h3>
           <p className='xl:text-lg lg:text-base text-sm text-gray-600'>
            let's finish your today's task
           </p>
        </div>
       <div className='lg:hidden block'>
      {
        !showMenu ?  
        <div onClick={()=>setShowMenu(true)} className='h-14 w-14 rounded-full flex justify-center items-center border-[1px] border-[#F5F5F7] bg-gray-50 cursor-pointer relative'> <Menu /> 
        </div> :
       <div
  ref={sideMenuRef}
  className={`px-5 pt-20 pb-4 absolute w-80 xs:min-w-80 xs:max-w-80 min-w-72 max-w-72 top-0 bg-white z-50 max-h-screen min-h-screen flex flex-col transition-transform delay-300 ease-out justify-between ${
    showMenu ? 'left-0' : '-left-96'
  }`}
>
  <Cross onClick={() => setShowMenu(false)} />
 <div>
   <div className='flex gap-1 mb-5'>
    <img src={logo} alt='Trackify logo' className='h-10 w-10 rounded-full' />
    <h2 className='xl:text-4xl text-3xl font-bold text-[#10B981]'>Trackify</h2>
  </div>
  <h2 className='xs:text-2xl text-xl'>Hi! {name}</h2>
  <div className='flex flex-col gap-5 mt-12 font-medium text-xl'>
    <Link to='/dashboard' onClick={()=>setShowMenu(false)}>Dashboard</Link>
    <Link to='/project' onClick={()=>setShowMenu(false)}>Project</Link>
    <Link to='/task' onClick={()=>setShowMenu(false)}>Task</Link>
     <Link to='/user' onClick={()=>setShowMenu(false)}>Users</Link>
  </div>
 </div>
    <button onClick={() => setIsModalOpen(true)} className="w-full h-11 rounded-lg bg-gray-300 hover:bg-gray-100 hover:text-black text-white cursor-pointer font-bold">Log Out</button>
</div>
      }
      </div>
        <div className='flex gap-10'>
          <FaUserCircle className='h-14 w-14 rounded-full' />
        </div>
      </header>
  )
}

export default Header