import axios from 'axios'
import { toast } from 'sonner'
import { useAuthEmailProps } from '../useAuth/useAuth.types'
import { useDispatch } from 'react-redux'
import { getUserData } from '@/context'

export const useSignupWithEmail = ({ email, password, setIsLoading, route }: useAuthEmailProps) => {
    const dispatch = useDispatch()
    const authEmail = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { data, statusText } = await axios.post(`${process.env.ROOT_URL}/auth/signup-email-step1`, {
                email,
                password,
                userName: 'ahmedyssdfsdfdfaosdfb234'
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
        } catch (error) {
            toast.error(`Credentials didn't pass authentication check.`)
            setIsLoading(false)
            throw new Error(error as string)
        }
    }

    return { authEmail } as const
}



