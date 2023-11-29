import { toast } from 'react-toastify'
import { API } from './API'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'
import { AppDispatch } from '../redux'
import { IUploadFile } from '../models'
import { setUploadFiles } from '../redux/uploadReducer'
import axios from 'axios'
import { API_URL } from './config'

export const getFiles = async (folderId: string | null, sortValue: string) => {
  try {
    let url = `api/files`
    if (folderId) {
      url = `api/files?parent=${folderId}&sort=${sortValue}`
    } else {
      url = `api/files?sort=${sortValue}`
    }

    const response = await API.get(url)
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const createFolder = async (folderId: string | null, name: string) => {
  try {
    const response = await API.post(`api/files`, {
      name,
      parent: folderId,
      type: 'dir'
    })
    return response
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const uploadFile = (formData: FormData, fileId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const filesFromSS = sessionStorage.getItem(ESSKeys.downloads) 
          ? JSON.parse(sessionStorage.getItem(ESSKeys.downloads) ?? '') 
          : []

      const response = await axios.post(`${API_URL}api/files/upload`, formData, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          const preparedFiles = filesFromSS.map((file: IUploadFile) => {
            return file.id === fileId ? {
              ...file,
              progress: percentCompleted
            } : file
          })
          dispatch(setUploadFiles(preparedFiles))
          sessionStorage.setItem(ESSKeys.downloads, JSON.stringify(preparedFiles))
        },
      })    
      return response                                 
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

}

export const downloadFile = async ( fileId: string, fileName: string ) => {
  const response = await API(`api/files/download?id=${fileId}`, {responseType: 'blob'})
  if (response.status === 200) {
    const blob = await response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const deleteFileApi = async (fileId: string) => {
  try {
    const response = await API.delete(`api/files?id=${fileId}`)
    toast.success(response.data.message)
    return response.status
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const searchFile = async (searchValue: string) => {
  try {
    const response = await API.get(`api/files/search?search=${searchValue}`)
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const renameFile = async (id: string, name: string, variables?: string) => {
  try {
    const response = await API.post('api/files/rename', { id, name })
    return response.data.message
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}
