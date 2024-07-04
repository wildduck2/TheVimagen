import { toast } from 'sonner'
import { useCompleteForgetPasswordType } from './useCompleteForgetPassword.types'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const useCompleteForgetPassword = ({ password, confirmPassword }: useCompleteForgetPasswordType) => {
  const user = useSelector((state: RootState) => state.user.user)
  const route = useNavigate()
  const [done, setDone] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updatePasswordInvoke = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      //NOTE: if no user navigate
      if (!user || password !== confirmPassword || password === '' || confirmPassword === '')
        return route({ to: '/auth/signin' })

      //NOTE: Update password with the new password
      const { data, statusText } = await axios.post(
        `${process.env.ROOT_URL}/auth/update-password`,
        {
          password,
          confirmPassword,
        },
        { withCredentials: true },
      )
      setIsLoading(false)
      //NOTE: handling errors if fails
      if (!data.updated || statusText !== 'OK') {
        return toast.error('Error: password has not updated!')
      }

      setDone(true)
      route({ to: '/dashboard/Home' })
      return toast.success('Password has updated sucssesfully')
    } catch (error) {
      setIsLoading(false)
      return toast.error('Error: password has not updated!')
    }
  }

  return { isLoading, updatePasswordInvoke, done } as const
}
