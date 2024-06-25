import { getUserData } from '@/context'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

export const useSignout = () => {
  const dispatch = useDispatch()
  const route = useNavigate()

  const SignoutInvoke = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      //NOTE: Making the req to the server with the credentials
      const { data, statusText } = await axios.post(`${process.env.ROOT_URL}/auth/signout`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (statusText !== 'OK' || !data.user) {
        toast.error('The User is not Signed out')
        return
      }

      dispatch(getUserData(null))
      route({ to: '/auth/signin' })
      return toast.success('The User is Signed out successfully')
    } catch (error) {
      return toast.error('Sign out failed. Please try again.')
    }
  }

  return SignoutInvoke
}
