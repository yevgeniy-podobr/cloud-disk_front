import { toast } from 'react-toastify'
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { API_URL } from './config'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const ERROR_NO_INTERNET = 'No internet connection'

const ERROR_AUTH = 'Auth error'

export const API = axios.create({
  baseURL: API_URL
})

API.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    if (!window.navigator.onLine) {
      toast.error(ERROR_NO_INTERNET, {
        toastId: ERROR_NO_INTERNET,
      })
    }

    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message === ERROR_AUTH) {
      setTimeout(() => window.location.reload(), 3000)
    }
    return Promise.reject(error)
  }
)
