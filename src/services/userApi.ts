import { AppDispatch, setIsAuth, setUser } from '../redux'
import { toast } from 'react-toastify'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'
import { API } from './API'

export const registration = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await API.post('api/auth/registration', {email, password})
      toast.success(response.data.message)
      dispatch(login(email, password))
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await API.post('api/auth/login', {email, password})
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
      const response = await API.get('api/auth/auth')
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

export const uploadAvatar = async (formData: FormData) => {
  try {
    const response = await API.post('api/files/avatar', formData)
    await API.get(`api/files/avatar/${response.data.avatar}`)
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const deleteAvatar = async () => {
  try {
    const response = await API.delete('api/files/avatar')
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await API.post('/api/reset-password', { email })
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const resetPassword = async (password: string, id: string, token: string) => {
  try {
    const response = await API.post(`/api/reset-password/${id}/${token}`, { password })
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}
 