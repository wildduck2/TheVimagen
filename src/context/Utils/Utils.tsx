import { createSlice } from '@reduxjs/toolkit';
import { initialStateTypes } from './Utils.types';

const initialState: initialStateTypes = {
    inputsValid: {
        email: false,
        password: false,
        passwordcomfirmation:false
    },
    passwordInRange: false,
    passwordHasUppercase: false,
    passwordHasLowercase: false,
    passwordHasNumber: false,
    passwordHasSpecialCharacter: false,

    emailisnotvalid: false,
};

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        checkInputsValid: (state, action) => {
            if (action.payload) {
                state.inputsValid = action.payload;
            }
        },
        passwordInRanceCheck: (state, action) => {
            if (action.payload) {
                state.passwordInRange = action.payload;
            }
        },
        passwordHasUppercase: (state, action) => {
            if (action.payload) {
                state.passwordHasUppercase = action.payload;
            }
        },
        passwordHasLowercase: (state, action) => {
            if (action.payload) {
                state.passwordHasLowercase = action.payload;
            }
        },
        passwordHasNumber: (state, action) => {
            if (action.payload) {
                state.passwordHasNumber = action.payload;
            }
        },
        passwordHasSpecialCharacter: (state, action) => {
            if (action.payload) {
                state.passwordHasSpecialCharacter = action.payload;
            }
        },
        emailisnotvalid: (state, action) => {
            if (action.payload) {
                state.emailisnotvalid = action.payload;
            }
        },


    },
});

export const {
    checkInputsValid,
    passwordInRanceCheck,
    passwordHasUppercase,
    passwordHasLowercase,
    passwordHasNumber,
    passwordHasSpecialCharacter,
    emailisnotvalid,
} = utilsSlice.actions;

export default utilsSlice.reducer;
