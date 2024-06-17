import axios from 'axios'
import { toast } from 'sonner'
import { useAuthEmailProps } from '../useAuth/useAuth.types'
import { useDispatch } from 'react-redux'
import { getUserData } from '@/context'
import { z } from 'zod'
import { useSigninWithEmailProps } from './userSigninWithEmail.types'
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui'
import { zodCreditValidation } from '@/utils'

export const useSigninWithEmail = ({ email, password, setIsLoading }: useSigninWithEmailProps) => {
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
                const { data, statusText } = await axios.post(`${process.env.ROOT_URL}/auth/signin-email`, {
                    email,
                    password,
                }, { withCredentials: true })



                if (statusText !== 'OK' && !data) {
                    //TODO: [ ]-- The dispatch and the next step
                    toast.error(`Credentials didn't pass authentication check.`)
                    return setIsLoading(false)
                }


                dispatch(getUserData(data))
                localStorage.setItem("email", email)
                toast.success('Access granted, authentication successful.')
                setIsLoading(false)
                route('/auth/signup/signup-email-step2')
            }
        } catch (error) {
            setIsLoading(false)
            if (error instanceof z.ZodError) {
                console.log('Validation errors:', error.errors);
                return toast.error("Wrong Email or Password! enter valid credentials")
            }
            console.log('AUTH errors', error)
            toast.error(`Credentials didn't pass authentication check.`)
        }
    }

    return { authEmail } as const
}



