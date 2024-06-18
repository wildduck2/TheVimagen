import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { z } from 'zod'

import { User, getUserData } from '@/context'
import { zodCreditValidation } from '@/utils'

import { useSigninWithEmailProps } from './userSigninWithEmail.types'

export const useSigninWithEmail = ({ email, password, setIsLoading, setEmailValid, setPasswordValid }: useSigninWithEmailProps) => {
    const dispatch = useDispatch()
    const route = useNavigate()

    const authEmail = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            //NOTE: Zod data validation
            const { validEmail, validPassword } = zodCreditValidation(email, password)

            if (validEmail || validPassword) {
                //NOTE: Making the req to the server with the credentials
                const { data, statusText } = await axios.post(
                    `${process.env.ROOT_URL}/auth/signin-email`,
                    {
                        email,
                        password,
                    },
                    { withCredentials: true },
                )

                if (statusText !== 'OK' && !data) {
                    //TODO: [ ]-- The dispatch and the next step
                    toast.error(`Credentials didn't pass authentication check.`)
                    setEmailValid(true)
                    setPasswordValid(true)
                    return setIsLoading(false)
                }

                dispatch(getUserData(data.user as User))
                console.log(data.user)
                localStorage.setItem('email', email)
                toast.success('Access granted, authentication successful.')
                setEmailValid(false)
                setPasswordValid(false)
                setIsLoading(false)
                route('/auth/signup/signup-email-step2')
            }
        } catch (error) {
            setIsLoading(false)
            if (error instanceof z.ZodError) {
                console.log('Validation errors:', error.errors)
                setEmailValid(false)
                setEmailValid(true)
                setPasswordValid(true)
                return toast.error('Wrong Email or Password! enter valid credentials')
            }
            // console.log('AUTH errors', error)
            toast.error(`Credentials didn't pass authentication check.`)
        }
    }

    return { authEmail } as const
}
