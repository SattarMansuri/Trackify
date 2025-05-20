import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const createTask = async ({title, date, status, about})=>{
try {
  const url = `${backendUrl}/api/task/create`
  const reqPayload = {title, date, status, about}
  const token = localStorage.getItem('token')
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios.post(url, reqPayload)
  return response.data
} catch (error) {
    console.log(error)
  return error.response.data
}
}

export const deleteTask = async (id)=>{
  try {
    const url = `${backendUrl}/api/task/delete/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const taskUpdate = async (id, taskPayload)=>{
  try {
    const url = `${backendUrl}/api/task/edit/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, taskPayload)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getAllTasks = async ()=>{
  try {
    const url = `${backendUrl}/api/task/alltask`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}