import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import data_reducer from '../Data/Data'
import utils_reducer from '../Utils/Utils'
import user_reducer from '../User/User'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  user: user_reducer,
  data: data_reducer,
  utils: utils_reducer,
})

export const store = configureStore({
  reducer: {
    user: user_reducer,
    data: data_reducer,
    utils: utils_reducer,
  },
})
