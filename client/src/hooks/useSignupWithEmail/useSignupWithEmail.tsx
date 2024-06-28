import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import { User, getUserData } from '@/context'
import { zodCreditValidation } from '@/utils'
import { type useSignupWithEmailType } from './useSignupWithEmail.types'

export const useSignupWithEmail = ({ email, password, setIsLoading }: useSignupWithEmailType) => {
  const route = useNavigate()
  const dispatch = useDispatch()

  const authEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      //NOTE: Zod data validation
      const { validEmail, validPassword } = zodCreditValidation(email, password)

      if (validEmail || validPassword) {
        //NOTE: Making the req to the server with the credentials
        const { data, statusText } = await axios.post(
          `${process.env.ROOT_URL}/auth/signup-email-step1`,
          {
            email,
            password,
            //FIX: get the real user Name data
            user_name: 'ahmedyssdfsdfdfaosdfb234',
          },
          { withCredentials: true },
        )

        if (data.error) {
          toast.error(data.error)
          return setIsLoading(false)
        }

        if (statusText !== 'OK' && !data) {
          toast.error(`Credentials didn't pass authentication check.`)
          return setIsLoading(false)
        }

        dispatch(getUserData(data.user as User))
        setIsLoading(false)
        route({ to: '/auth/otp-verification-step', search: { forgetPassword: false } })
        return toast.success('Access granted, authentication successful.')
      }
    } catch (error) {
      setIsLoading(false)
      if (error instanceof z.ZodError) {
        console.log('Validation errors:', error.errors)
        return toast.error('Wrong Email or Password! enter valid credentials')
      }
      return toast.error(`Credentials didn't pass authentication check.`)
    }
  }

  return { authEmail } as const
}
