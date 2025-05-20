import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const createProject = async ({title, company, date, assignTo, about})=>{
try {
  const url = `${backendUrl}/api/project/create`
  const reqPayload = {title, company, date, assignTo, about}
  const token = localStorage.getItem('token')
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios.post(url, reqPayload)
  return response.data
} catch (error) {
    console.log(error)
  return error.response.data
}
}

export const deleteProject = async (id)=>{
  try {
    const url = `${backendUrl}/api/project/delete/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const projectUpdate = async (id, taskPayload)=>{
  try {
    const url = `${backendUrl}/api/project/edit/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, taskPayload)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getAllProjects = async ()=>{
  try {
    const url = `${backendUrl}/api/Project/alltask`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}