// import { useNavigate } from '@tanstack/react-router'
// import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { z } from 'zod'
import { useSigninWithGoogleProps } from './useSigninWithGoogle.types'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'

export const useSigninWithGoogle = ({ setIsLoading }: useSigninWithGoogleProps) => {
  const dispatch = useDispatch()
  const route = useNavigate()

  const authEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const width = 600
    const height = 600
    const left = (screen.width - width) / 2
    const top = (screen.height - height) / 2

    const promise = new Promise((resolve, reject) => {
      const cb = async () => {
        try {
          //NOTE: Making the req to the server with the credentials
          const { data, statusText } = await axios.get(`${process.env.ROOT_URL}/oauth/signin-google`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })

          //NOTE: handing errors if rejected
          if (statusText !== 'OK' && !data.url) {
            reject(false)
            return setIsLoading(false)
          }

          //NOTE: opening widow with the url to make perform the signin within popup window
          // const popupWindow: Window | null =
          const popupWindow = window.open(
            data.url,
            '_blank',
            `width=${width},height=${height}, left=${left}, top=${top}`,
          )

          // //NOTE: handing errors if rejected
          setIsLoading(false)
          if (data?.user || data.error) return reject(false)

          // //NOTE: closing the window and routing with dispatch to the data
          // resolve(true)
          // popupWindow?.close()
          // dispatch(getUserData(data.user as User))
          // route({ to: '/email/inbox' })
        } catch (error) {
          setIsLoading(false)
          if (error instanceof z.ZodError) {
            console.log('Validation errors:', error.errors)
          }
          console.log('AUTH errors', error)
          reject(error)
        }
      }
      cb()
    })
    toast.promise(promise, {
      loading: 'Waiting for Google login...',
      success: 'Access granted, authentication successful.',
      error: "Credentials didn't pass authentication check.",
    })
  }

  return { authEmail } as const
}
