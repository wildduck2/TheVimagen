import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../context/redux/store'
import { supabase } from '../../../supabase/supabase'
import { LogDialog } from '../../layouts'
import { signout } from '../../../context/Data/Data'

const Home = () => {
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

export default Home
