import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from "./pages/Layout"
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Task from "./pages/Task"
import User from './pages/User'
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/dashboard',
          element: <ProtectedRoute Component={Dashboard} />
        },
        {
          path: '/project',
          element: <ProtectedRoute Component={Project} />
        },
        {
          path: '/task',
          element: <ProtectedRoute Component={Task} />
        },
        {
          path: '/user',
          element: <ProtectedRoute Component={User} />
        }
      ]
    }
  ])
  return (
  <RouterProvider router={router} />
  )
}

export default App
