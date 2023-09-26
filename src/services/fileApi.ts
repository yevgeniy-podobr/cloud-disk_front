import axios from 'axios'
import { AppDispatch, addFile, deleteFile, setFiles } from '../redux'
import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

export const getFiles = (folderId: string | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files${folderId ? `?parent=${folderId}` : ''}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(setFiles(response.data))
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
}

export const creatFolder = (folderId: string | null, name: string) => {
  return async (dispatch: AppDispatch) => {
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
      dispatch(addFile(response.data))
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
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
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      dispatch(addFile(response.data))
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

export const deleteFileApi = (fileId: string,) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/files?id=${fileId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      dispatch(deleteFile(fileId))
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
}
