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
  userName: boolean
  email: boolean
  password: boolean
  passwordConfirm: boolean
}

export interface InputsValidState {
  inputsValid: InputsValid
}

export interface InputsValidAction {
  payload: InputsValid
}
