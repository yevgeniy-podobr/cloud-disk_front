import axios from 'axios'
import { AppDispatch, setIsAuth, setUser } from '../redux'
import { toast } from 'react-toastify'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'
import { API_URL } from '../config'

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, {email, password})

    toast.success(response.data.message)
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {email, password})
      dispatch(setUser(response.data.user))
      dispatch(setIsAuth(true))
      localStorage.setItem("token", response.data.token)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
}

export const auth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(setUser(response.data.user))
      dispatch(setIsAuth(true))
      localStorage.setItem("token", response.data.token)
      sessionStorage.removeItem(ESSKeys.downloads)
    } catch (error: any) {
      localStorage.removeItem("token")
      sessionStorage.removeItem(ESSKeys.downloads)
      toast.error(error.response.data.message)
    }
  }
}

export const uploadAvatar = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const deleteAvatar = async () => {
  try {
    const response = await axios.delete(`${API_URL}api/files/avatar`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}
