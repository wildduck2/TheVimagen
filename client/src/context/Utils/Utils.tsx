import { createSlice } from '@reduxjs/toolkit'
import { initialStateTypes } from './Utils.types'

const initialState: initialStateTypes = {
    inputsValid: {
        email: false,
        password: false,
        passwordcomfirmation: false,
    },
    passwordInRange: false,
    passwordHasUppercase: false,
    passwordHasLowercase: false,
    passwordHasNumber: false,
    passwordHasSpecialCharacter: false,

    emailisnotvalid: false,
}

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        checkInputsValid: (state, action) => {
            if (action.payload) {
                state.inputsValid = action.payload
            }
        },
    },
})

export const {
    checkInputsValid,
} = utilsSlice.actions

export default utilsSlice.reducer
