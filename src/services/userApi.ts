import axios from 'axios'
import { toast } from 'react-toastify'

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {email, password})

      alert(response.data.message)
  } catch (error: any) {
    console.log(error.response.data)
    alert(error.response.data.message)
    // if (error instanceof Error) {
    //   toast.error(error.message)
    // }
  }
}
