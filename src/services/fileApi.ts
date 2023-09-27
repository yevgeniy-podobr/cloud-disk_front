import axios from 'axios'
import { AppDispatch } from '../redux'
import { toast } from 'react-toastify'
import { setIsVisible, setUploadFiles } from '../redux/uploadReducer'
import { ESSKeys } from '../utils/constants/sessionStorageKeys'

export const getFiles = async (folderId: string | null, sortValue: string) => {
  try {
    let url = 'http://localhost:5000/api/files'
    if (folderId) {
      url = `http://localhost:5000/api/files?parent=${folderId}&sort=${sortValue}`
    } else {
      url = `http://localhost:5000/api/files?sort=${sortValue}`
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}

export const creatFolder = async (folderId: string | null, name: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/files', {
      name,
      parent: folderId,
      type: 'dir'
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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

      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
        ///TODO add progress for uploading files
      })  

      if (!downloads) {
        dispatch(setUploadFiles([uploadFile]))
        sessionStorage.setItem(ESSKeys.downloads, JSON.stringify([uploadFile]))
      } else {
        const preparedData = [...(JSON.parse(downloads)), uploadFile]

        dispatch(setUploadFiles(preparedData))
        sessionStorage.setItem(ESSKeys.downloads, JSON.stringify(preparedData))
      }      
      dispatch(setIsVisible(true))      
      return response                                 
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
}

export const downloadFile = async ( fileId: string, fileName: string ) => {
  const response = await fetch(`http://localhost:5000/api/files/download?id=${fileId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
  })
  if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const deleteFileApi = async (fileId: string,) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/files?id=${fileId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
    toast.success(response.data.message)
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
}
