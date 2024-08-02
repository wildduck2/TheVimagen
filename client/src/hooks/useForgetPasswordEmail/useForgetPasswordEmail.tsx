import { z } from 'zod'
import { UseForgetPassowrdType } from './useForgetPasswordEmail.types'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import { User, getUserData } from '@/context'

export const useForgetPasswordEmail = ({ setIsLoading, email }: UseForgetPassowrdType) => {
  const dispatch = useDispatch()
  const route = useNavigate()

  const ForgetPassowrd = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      //NOTE: Making the req to the server with the credentials
      const { data, statusText } = await axios.post(
        `${process.env.ROOT_URL}/auth/forgetPassword`,
        {
          email,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (statusText !== 'OK' || !data.user) {
        //TODO: [ ]-- The dispatch and the next step
        toast.error('The user does not exist')
        return setIsLoading(false)
      }

      dispatch(getUserData(data.user as User))
      toast.success('Account found, moving forward!!')
      setIsLoading(false)
      route({ to: '/auth/otp-verification-step', search: { forgetPassword: true } })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('The email is not valied')
      }

      toast.error('The user does not exist')
    }
  }

  return ForgetPassowrd
}
