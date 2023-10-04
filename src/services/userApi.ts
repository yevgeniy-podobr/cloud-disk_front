import { AppDispatch, setIsAuth, setUser } from '../redux'
import { toast } from 'react-toastify'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'
import { API } from './API'

export const registration = async (email: string, password: string) => {
  try {
    const response = await API.post('api/auth/registration', {email, password})

    toast.success(response.data.message)
  } catch (error: any) {
    toast.error(error.response.data.message)
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

export const uploadAvatar = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await API.post('api/files/avatar', formData)
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
