import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'

import { RootState } from '@/context'
import type { error, useSignupIWthEmailStep3Props } from './useSignupWithEmailStep3.types'

export const useSignupIWthEmailStep3 = ({
  firstName,
  lastName,
  age,
  profession,
  yearsOfExprience,
  pronounce,
  bio,
}: useSignupIWthEmailStep3Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user.user)
  const [error, setError] = useState<error>(null)

  const formSubmitionInvoke = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError({
      firstName: !firstName ? true : false,
      lastName: !lastName ? true : false,
      pronounce: !pronounce ? true : false,
      age: !age ? true : false,
      profession: !profession ? true : false,
      yearsOfExprience: !yearsOfExprience ? true : false,
      bio: !bio ? true : false,
    })
    if (
      lastName === '' ||
      firstName === '' ||
      age === '' ||
      yearsOfExprience === '' ||
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
          firstName,
          lastName,
          age,
          yearsOfExprience,
          pronounce,
          profession,
          bio,
          userId: user?.id,
        },
        { withCredentials: true },
      )

      if (!data && statusText === 'OK') {
        toast.error(`Failed ot complete the comfermation of the data!`)
      }

      setIsLoading(false)
      console.log(data)
    } catch (error) {
      toast.error(`Failed ot complete the comfermation of the data!`)
      setIsLoading(false)
      console.log(error)
    }
  }

  return { error, isLoading, formSubmitionInvoke } as const
}
