import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabase'
import { AuthError, User } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'
import { getUserDispatch } from '../../context/Data/Data'

const useUser = ({ signedout }: { signedout: boolean }) => {
  const [session, setSession] = useState<User>()
  const [error, setError] = useState<AuthError>()
  const dipatch = useDispatch()

  useEffect(() => {
    const fn = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (data.user) {
          setSession(data.user as User)
          dipatch(getUserDispatch(data.user as User))
        }

        if (error) {
          setError(error)
        }
      } catch (error) {
        throw new Error(error as string)
      }
    }
    fn()
  }, [signedout])

  return [session, error] as const
}

export default useUser
