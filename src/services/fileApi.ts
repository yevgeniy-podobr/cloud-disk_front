import axios from 'axios'
import { AppDispatch, addFile, setFiles } from '../redux'

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
