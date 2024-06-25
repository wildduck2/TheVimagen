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
        toast.error('The user does not exist')
      }

      dispatch(getUserData(null))
      route({ to: '/auth/signin' })
      return toast.success(`Sign out done, sucessfully`)
    } catch (error) {
      return toast.error(`Sign out fails, try again!`)
    }
  }

  return SignoutInvoke
}
