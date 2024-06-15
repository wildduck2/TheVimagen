export interface initialStateTypes {
    inputsValid: InputsValid
    passwordInRange: boolean
    passwordHasUppercase: boolean
    passwordHasLowercase: boolean
    passwordHasNumber: boolean
    passwordHasSpecialCharacter: boolean
    emailisnotvalid: boolean
}

export interface InputsValid {
    email: boolean;
    password: boolean;
    passwordComfirm: boolean;
}

export interface InputsValidState {
    inputsValid: InputsValid;
}

export interface InputsValidAction {
    payload: InputsValid;
}

