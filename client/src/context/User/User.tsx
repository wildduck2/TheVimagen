import { createSlice } from '@reduxjs/toolkit'
import { UserInitialStateType } from './User.types'

const userInitialState: UserInitialStateType = {
    user: null
}

export const userSlice = createSlice({
    name: 'data',
    initialState: userInitialState,
    reducers: {
        getUserData: (state, action) => {
            state.user = action.payload
        },
        // signin: (state) => {
        //     state.logged = true
        //     localStorage.setItem('userData', JSON.stringify(state.logged))
        // },
        // signout: (state) => {
        //     state.logged = false
        //     state.userData = null
        //     localStorage.setItem('userData', JSON.stringify(state.logged))
        // },
    },
})

export const { getUserData: getUserData } = userSlice.actions

export default userSlice.reducer
