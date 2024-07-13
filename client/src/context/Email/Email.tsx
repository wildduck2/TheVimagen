import { createSlice } from '@reduxjs/toolkit'
import {
  initialStateEmailTypes,
  SearchInputIdAction,
  SearchInputIdState,
  SelectedEmailDataAction,
  SelectedEmailDataState,
  SelectedThreadsActoin,
  SelectedThreadsState,
} from './Email.types'

const initialState: initialStateEmailTypes = {
  SelectedEmailData: { ids: [], inReplyTo: '' },
  selectedThreads: [],
  searchInput: '',
}

export const emailSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getSelectedEmailIdDispatch: (state: SelectedEmailDataState, action: SelectedEmailDataAction) => {
      state.SelectedEmailData = action.payload
    },
    getSearchInput: (state: SearchInputIdState, action: SearchInputIdAction) => {
      state.searchInput = action.payload
    },
    getSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsActoin) => {
      const threadId = action.payload
      if (!state.selectedThreads.includes(threadId)) {
        state.selectedThreads = [...state.selectedThreads, threadId]
      }
    },
    removeSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsActoin) => {
      const threadId = action.payload
      state.selectedThreads = state.selectedThreads.filter((id) => id !== threadId)
    },
  },
})

export const { getSelectedEmailIdDispatch, getSearchInput, getSelectedThreadsDispatch, removeSelectedThreadsDispatch } =
  emailSlice.actions

export default emailSlice.reducer
