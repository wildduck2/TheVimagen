import { createSlice } from '@reduxjs/toolkit'
import {
  initialStateEmailTypes,
  SearchInputIdAction,
  SearchInputIdState,
  SelectedEmailDataAction,
  SelectedEmailDataState,
  SelectedThreadsAction,
  SelectedThreadsState,
  ThreadsFetchedAction,
  ThreadsFetchedState,
} from './Email.types'

const initialState: initialStateEmailTypes = {
  SelectedEmailData: { ids: [], inReplyTo: '' },
  selectedThreads: [],
  searchInput: '',
  threadsFetched: [],
}

export const emailSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    //NOTE: getting email clicked
    getSelectedEmailIdDispatch: (state: SelectedEmailDataState, action: SelectedEmailDataAction) => {
      state.SelectedEmailData = action.payload
    },

    //NOTE: getting search q
    getSearchInput: (state: SearchInputIdState, action: SearchInputIdAction) => {
      state.searchInput = action.payload
    },

    //NOTE: getting selected ids
    getSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsAction) => {
      const threadIds = action.payload
      threadIds.forEach((threadId) => {
        if (!state.selectedThreads.includes(threadId)) {
          state.selectedThreads.push(threadId)
        }
      })
    },

    removeSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsAction) => {
      const threadIds = action.payload
      state.selectedThreads = state.selectedThreads.filter((id) => !threadIds.includes(id))
    },

    //NOTE: gettign threads fetched ids
    getThreadsFetchedDispatched: (state: ThreadsFetchedState, action: ThreadsFetchedAction) => {
      state.threadsFetched = action.payload
    },
  },
})

export const {
  getSelectedEmailIdDispatch,
  getSearchInput,
  getSelectedThreadsDispatch,
  removeSelectedThreadsDispatch,
  getThreadsFetchedDispatched,
} = emailSlice.actions

export default emailSlice.reducer
