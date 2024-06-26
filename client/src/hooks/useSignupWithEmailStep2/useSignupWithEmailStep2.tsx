import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

import { RootState } from '@/context'
import type { useSignupIWthEmailStep2Props } from './useSignupWithEmailStep2.types'

export const useSignupIWthEmailStep2 = ({ otp, forgetPassword }: useSignupIWthEmailStep2Props) => {
  const route = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user.user)
  const [valid, setValid] = useState<boolean>(true)

  const formSubmitionInvoke = async () => {
    if (otp === '') return
    setIsLoading(true)
    try {
      //NOTE: Making the req to the server with the credentials
      const { data, statusText } = await axios.post(
        `${process.env.ROOT_URL}/auth/signup-email-step2`,
        {
          otp,
          userId: user?.id,
        },
        { withCredentials: true },
      )

      console.log(data)
      setIsLoading(false)

      if (data.verified === false || data.error || statusText !== 'OK') {
        setValid(false)
        return toast.error(`failed to verify your Account wrong OTP`)
      }

      route({ to: forgetPassword ? '/auth/complete-forget-password' : '/auth/complete-account-information' })
    } catch (error) {
      toast.error(`couldn't verify the OTP code try again!`)
      setValid(false)
      setIsLoading(false)
      console.log(error)
    }
  }

  return { valid, isLoading, formSubmitionInvoke } as const
}
