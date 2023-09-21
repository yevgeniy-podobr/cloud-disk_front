import axios from 'axios'
import { AppDispatch, addFile, setFiles } from '../redux'
import { IFile } from '../models'

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
      alert(error.message)
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
      alert(error.message)
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
      alert(error.message)
    }
  }
}
