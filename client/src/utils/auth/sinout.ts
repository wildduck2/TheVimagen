import axios from 'axios'
import { toast } from 'sonner'

export const signoutAsync = async () => {
  try {
    const response = await axios.post(`${process.env.ROOT_URL}/auth/signout`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('sdfsdf')
    if (response.statusText !== 'OK' || !response.data.user) {
      toast.error('The User is not Signed out')
      return
    }

    toast.success('The User is Signed out successfully')
    return true
  } catch (error) {
    toast.error('Sign out failed. Please try again.')
    return false
  }
}
