import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../context/redux/store'
import { supabase } from '../../../supabase/supabase'
import { LogDialog } from '../../layouts'
import { signout } from '../../../context/Data/Data'


const Home = () => {
    const store = useSelector((state: RootState) => state.data)
    const dispatch = useDispatch()


    return (

        store.logged ? <div>
            <button onClick={() => {
                supabase.auth.signOut()
                dispatch(signout())
            }}> Welcome </button>       Homer
        </div> : <LogDialog />

    )
}


export default Home
