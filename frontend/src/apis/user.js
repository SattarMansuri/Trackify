import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const createUser = async ({firstName, lastName, mailId, country, role, about, projects})=>{
try {
  const url = `${backendUrl}/api/user/create`
  const reqPayload = {firstName, lastName, mailId, country, role, about, projects}
  const token = localStorage.getItem('token')
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios.post(url, reqPayload)
  return response.data
} catch (error) {
    console.log(error)
  return error.response.data
}
}

export const deleteUser = async (id)=>{
  try {
    const url = `${backendUrl}/api/user/delete/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const userUpdate = async (id, taskPayload)=>{
  try {
    const url = `${backendUrl}/api/user/edit/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, taskPayload)
    return response.data
  } catch (error) {
    console.log(error)
     return error.response.data
  }
}
export const getAllUsers = async ()=>{
  try {
    const url = `${backendUrl}/api/user/alltask`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}