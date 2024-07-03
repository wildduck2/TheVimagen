import { createSlice } from '@reduxjs/toolkit'
import { initialStateEmailTypes, SelectedEmailIdAction, SelectedEmailIdState } from './Email.types'

const initialState: initialStateEmailTypes = {
  selectedEmailId: [],
}

export const emailSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getSelectedEmailIdDispatch: (state: SelectedEmailIdState, action: SelectedEmailIdAction) => {
      state.selectedEmailId = action.payload
    },
  },
})

export const { getSelectedEmailIdDispatch } = emailSlice.actions

export default emailSlice.reducer
