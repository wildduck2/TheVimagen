import { useDispatch, useSelector } from 'react-redux'

import { LogDialog } from '@/components/layouts'
import { signout } from '@/context/Data'
import { supabase } from '@/supabase/supabase'
import { RootState } from '@/context'

export const Home = () => {
  const logged = useSelector((state: RootState) => state.data.logged)
  const dispatch = useDispatch()

  return logged ? (
    <div className="w-full">
      <button
        onClick={() => {
          supabase.auth.signOut()
          dispatch(signout())
        }}
      >
        Welcome
      </button>
      Home
    </div>
  ) : (
    <LogDialog />
  )
}
