import axios from 'axios'
import { AppDispatch, setCurrentDir, setFiles } from '../reducers'

export const getFiles = (dirId: string | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files${dirId ? `?parent=${dirId}` : ''}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(setFiles(response.data))
      // response.data[0] && dispatch(setCurrentDir(response.data[0]._id))
    } catch (error: any) {
      alert(error.message)
    }
  }
}