import React, { useEffect, useState } from 'react'
import { getAllProjects } from './apis/project'
import { getAllUsers } from './apis/user'
import { getAllTasks } from './apis/task'
import MyStore from './MyStore'

const MyProvider = ({children}) => {
    const [projectData, setProjectData] = useState([])
    const [userData, setUserData] = useState([])
    const [taskData, setTaskData] = useState([])
      const [updateProject, setUpdateProject] = useState({})
    const [updateUser, setUpdateUser] = useState({})
    const [updateTask, setUpdateTask] = useState({})
     const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem("token"));
    const [isLoggedIn] = useState(!!token);
    const [name] = useState(`${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`.trim());
    const [email] = useState(localStorage.getItem("email"))
  useEffect(() => {
    let isMounted = true;

    const getAllData = async () => {
      try {
        setLoading(true);
        const [projects, users, tasks] = await Promise.all([
          getAllProjects(),
          getAllUsers(),
          getAllTasks()
        ], 2000)
        if (isMounted) {
          setProjectData(projects);
          setUserData(users);
          setTaskData(tasks);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch data:", err)
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    getAllData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <MyStore.Provider value={{
     setProjectData, 
     setUserData,
     setTaskData,
     setUpdateProject,
     setUpdateUser,
     setUpdateTask,
     setLoading,
     setError,
     projectData, 
     userData,
     taskData, 
     loading, 
     error,
     token,
     isLoggedIn,
     name,
     updateProject,
     updateUser,
     updateTask
    }}
    >
        {children}
    </MyStore.Provider>
  )
}

export default MyProvider