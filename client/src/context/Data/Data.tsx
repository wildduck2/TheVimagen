import { createSlice } from '@reduxjs/toolkit'
import { initialStateTypes } from './Data.types'

const initialState: initialStateTypes = {
  satatus: 'loading',
  userData: null,
  logged: JSON.parse(localStorage.getItem('userData') || 'false'),
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getUserDispatch: (state, action) => {
      state.logged = true
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(state.logged))
    },
    signin: (state) => {
      state.logged = true
      localStorage.setItem('userData', JSON.stringify(state.logged))
    },
    signout: (state) => {
      state.logged = false
      state.userData = null
      localStorage.setItem('userData', JSON.stringify(state.logged))
    },
  },
})

export const { getUserDispatch, signin, signout } = dataSlice.actions

export default dataSlice.reducer
