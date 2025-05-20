import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
     <div className="flex">
      <aside className="sidebar z-20">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 z-10">
          <Header />
          <Outlet />
      </div>
    </div>
  )
}

export default Layout