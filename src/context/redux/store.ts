import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import dataReducer from '../Data/Data';
import utilsReducer from '../Utils/Utils';
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  data: dataReducer,
  utils: utilsReducer,
});

export const store = configureStore({
  reducer: {
    data: dataReducer,
    utils: utilsReducer,
  },
});
