import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import dataReduceer from '../Data/Data'
import utilsReducer from '../Utils/Utils'
import userReducer from '../User/User'
import emailReducer from '../Email/Email'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReduceer,
  utils: utilsReducer,
  email: emailReducer,
})

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReduceer,
    utils: utilsReducer,
    email: emailReducer,
  },
})
