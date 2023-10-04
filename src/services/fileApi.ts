import { AppDispatch } from '../redux'
import { toast } from 'react-toastify'
import { setIsVisible, setUploadFiles } from '../redux/uploadReducer'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'
import { API } from './API'

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

export const creatFolder = async (folderId: string | null, name: string) => {
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

export const uploadFile = (file: File, folderId: string | null, ) => {
  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (folderId) {
        formData.append('parent', folderId)
      }
      const uploadFile = {id: Date.now(), name: file.name, progress: 0}
      const downloads = sessionStorage.getItem(ESSKeys.downloads)
      dispatch(setIsVisible(true))
      const response = await API.post(`api/files/upload`, formData
        ///TODO add progress for uploading files
      )  

      if (!downloads) {
        dispatch(setUploadFiles([uploadFile]))
        sessionStorage.setItem(ESSKeys.downloads, JSON.stringify([uploadFile]))
      } else {
        const preparedData = [...(JSON.parse(downloads)), uploadFile]

        dispatch(setUploadFiles(preparedData))
        sessionStorage.setItem(ESSKeys.downloads, JSON.stringify(preparedData))
      }      
            
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
