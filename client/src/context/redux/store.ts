import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import dataReducer from '../Data/Data'
import utilsReducer from '../Utils/Utils'
import userReducer from '../User/User'
export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
    utils: utilsReducer,
})

export const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        utils: utilsReducer,
    },
})
