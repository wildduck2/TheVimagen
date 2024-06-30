import { setValidType } from '@/utils'

export type useSigninWithEmailProps = {
  email: string
  password: string
  setIsLoading: setValidType
  setEmailValid: setValidType
  setPasswordValid: setValidType
}
