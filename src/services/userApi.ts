import axios from 'axios'
import { toast } from 'react-toastify'
import { AppDispatch, setIsAuth, setUser, useAppDispatch } from '../reducers'

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {email, password})

    alert(response.data.message)
  } catch (error: any) {
    alert(error.response.data.message)
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {email, password})
      dispatch(setUser(response.data.user))
      dispatch(setIsAuth(true))
      localStorage.setItem("token", response.data.token)
    } catch (error: any) {
      alert(error.responce.data.message)
    }
  }
}

export const auth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(setUser(response.data.user))
      dispatch(setIsAuth(true))
      localStorage.setItem("token", response.data.token)
    } catch (error: any) {
      localStorage.removeItem("token")
      alert(error.message)
    }
  }
}
