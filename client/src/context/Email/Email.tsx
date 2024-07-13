import { createSlice } from '@reduxjs/toolkit'
import {
    initialStateEmailTypes,
    SearchInputIdAction,
    SearchInputIdState,
    SelectedEmailDataAction,
    SelectedEmailDataState,
} from './Email.types'

const initialState: initialStateEmailTypes = {
    SelectedEmailData: { ids: [], inReplyTo: '' },
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
    },
})

export const { getSelectedEmailIdDispatch, getSearchInput } = emailSlice.actions

export default emailSlice.reducer
