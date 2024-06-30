import { createSlice } from '@reduxjs/toolkit'
import { GetThreadsAction, GetThreadsState, initialStateTypes } from './Email.types'

const initialState: initialStateTypes = {
  threads_data: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    get_threads_data: (state: GetThreadsState, action: GetThreadsAction) => {
      state.threads_data = action.payload
    },
  },
})

export const { get_threads_data } = dataSlice.actions

export default dataSlice.reducer
