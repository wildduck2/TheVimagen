import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'

import { RootState, User, getUserData } from '@/context'
import type { error, useSignupIWthEmailStep3Props } from './useSignupWithEmailStep3.types'
import { useNavigate } from '@tanstack/react-router'
import { disconnect } from 'process'

export const useSignupIWthEmailStep3 = ({
  first_name,
  last_name,
  age,
  profession,
  years_of_exprience,
  pronounce,
  bio,
}: useSignupIWthEmailStep3Props) => {
  const route = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user.user)
  const [error, setError] = useState<error>(null)

  const formSubmitionInvoke = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError({
      first_name: !first_name ? true : false,
      last_name: !last_name ? true : false,
      pronounce: !pronounce ? true : false,
      age: !age ? true : false,
      profession: !profession ? true : false,
      years_of_exprience: !years_of_exprience ? true : false,
      bio: !bio ? true : false,
    })
    if (
      last_name === '' ||
      first_name === '' ||
      age === '' ||
      years_of_exprience === '' ||
      profession === '' ||
      pronounce == '' ||
      bio === ''
    ) {
      return toast.error('Please Fill all fields to complete this step!!!')
    }
    try {
      if (!user?.id) return toast.error('Please signin, You are not signed in yet!!')
      setIsLoading(true)

      //NOTE: Making the req to the server with the credentials
      const { data, statusText } = await axios.post(
        `${process.env.ROOT_URL}/auth/signup-email-step3`,
        {
          first_name,
          last_name,
          age: +age,
          years_of_exprience: +years_of_exprience,
          pronounce,
          profession,
          bio,
          user_id: user?.id,
        },
        { withCredentials: true },
      )

      if (!data && statusText === 'OK') {
        toast.error(`Failed ot complete the comfermation of the data!`)
      }

      setIsLoading(false)
      dispatch(getUserData(data.user as User))
      route({ to: '/dashboard/Home' })
    } catch (error) {
      toast.error(`Failed ot complete the comfermation of the data!`)
      setIsLoading(false)
      console.log(error)
    }
  }

  return { error, isLoading, formSubmitionInvoke } as const
}
