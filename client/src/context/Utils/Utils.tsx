import { createSlice } from '@reduxjs/toolkit'
import { InputsValidAction, InputsValidState, initialStateTypes } from './Utils.types'

const initialState: initialStateTypes = {
    inputsValid: {
        email: false,
        password: false,
        passwordComfirm: false,
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
        checkInputsValid: (state: InputsValidState, action: InputsValidAction) => {
            if (action.payload) {
                state.inputsValid = action.payload
            }
        },
    },
})

export const { checkInputsValid } = utilsSlice.actions

export default utilsSlice.reducer
