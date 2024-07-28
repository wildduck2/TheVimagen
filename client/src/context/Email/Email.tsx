import { createSlice } from '@reduxjs/toolkit'
import {
  initialStateEmailTypes,
  MultiReplyAction,
  MultiReplyState,
  ReplyStatusAction,
  ReplyStatusState,
  SearchInputIdAction,
  SearchInputIdState,
  SelectedEmailDataAction,
  SelectedEmailDataState,
  SelectedThreadsAction,
  SelectedThreadsState,
  SnoozeButtonStatusAction,
  SnoozeButtonStatusState,
  ThreadsFetchedAction,
  ThreadsFetchedState,
} from './Email.types'

const initialState: initialStateEmailTypes = {
  selectedThread: [],
  selectedThreads: [],
  searchInput: '',
  threadsFetched: [],
  multiReply: { alert: false, drawer: false },
  replyStatus: { replyAll: false, forward: false, attachment: false },
  snoozeButtonStatus: {
    snoozeButtonStatus: false,
    onTheFlySnooze: false,
  },
}

export const emailSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    //NOTE: getting email clicked
    getSelectedEmailDispatch: (state: SelectedEmailDataState, action: SelectedEmailDataAction) => {
      state.selectedThread = action.payload
    },

    //NOTE: getting search q
    getSearchInput: (state: SearchInputIdState, action: SearchInputIdAction) => {
      state.searchInput = action.payload
    },

    //NOTE: getting selected ids
    getSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsAction) => {
      const threadIds = action.payload
      threadIds.forEach((threadId) => {
        if (!state.selectedThreads.some((item) => item.threadId === threadId.threadId)) {
          state.selectedThreads.push(threadId)
        }
      })
    },

    setSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsAction) => {
      state.selectedThreads = action.payload
    },

    removeSelectedThreadsDispatch: (state: SelectedThreadsState, action: SelectedThreadsAction) => {
      const emailsToRemove = action.payload
      const threadIdsToRemove = emailsToRemove.map((email) => email.threadId)
      state.selectedThreads = state.selectedThreads.filter((email) => !threadIdsToRemove.includes(email.threadId))
    },

    //NOTE: gettign threads fetched ids
    getThreadsFetchedDispatched: (state: ThreadsFetchedState, action: ThreadsFetchedAction) => {
      state.threadsFetched = action.payload
    },

    //NOTE: gettign threads fetched ids
    getMultiReplyState: (state: MultiReplyState, action: MultiReplyAction) => {
      state.multiReply = action.payload
    },

    //NOTE: getting reply all state
    getReplyStatusState: (state: ReplyStatusState, action: ReplyStatusAction) => {
      state.replyStatus = action.payload
    },

    getSnoozeButtonStatus: (state: SnoozeButtonStatusState, action: SnoozeButtonStatusAction) => {
      state.snoozeButtonStatus = action.payload
    },
  },
})

export const {
  getSelectedEmailDispatch,
  getSearchInput,
  getSelectedThreadsDispatch,
  removeSelectedThreadsDispatch,
  getThreadsFetchedDispatched,
  getMultiReplyState,
  getReplyStatusState,
  getSnoozeButtonStatus,
  setSelectedThreadsDispatch,
} = emailSlice.actions

export default emailSlice.reducer
