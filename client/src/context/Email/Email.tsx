import { createSlice } from '@reduxjs/toolkit'
import {
  initialStateEmailTypes,
  SearchInputIdAction,
  SearchInputIdState,
  SelectedEmailIdAction,
  SelectedEmailIdState,
} from './Email.types'

const initialState: initialStateEmailTypes = {
  selectedEmailId: [],
  searchInput: '',
}

export const emailSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getSelectedEmailIdDispatch: (state: SelectedEmailIdState, action: SelectedEmailIdAction) => {
      state.selectedEmailId = action.payload
    },
    getSearchInput: (state: SearchInputIdState, action: SearchInputIdAction) => {
      state.searchInput = action.payload
    },
  },
})

export const { getSelectedEmailIdDispatch, getSearchInput } = emailSlice.actions

export default emailSlice.reducer
