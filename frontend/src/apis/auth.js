import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL
export const registerUser = async ({firstName, lastName, email, password, country})=>{
try {
  const url = `${backendUrl}/api/auth/register`
  const reqPayload = {firstName, lastName, email, password, country}
  const response = await axios.post(url, reqPayload)
  return response.data
} catch (error) {
    console.log(error)
  return error.response.data
}
}
export const userLogin = async ({email, password}) =>{
  try {
    const url =`${backendUrl}/api/auth/login`
    const response = await axios.post(url, {email, password})
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}
export const updateUser = async (oldPassword, newPassword)=>{
  try {
    const url = `${backendUrl}/api/auth/update`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, {oldPassword, newPassword})
    console.log(response)
    return response.data
  } catch (error) {
    return error.response.data
  }
}