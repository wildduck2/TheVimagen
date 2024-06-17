import { InputsValid } from '@/context'
import { AnyAction, Dispatch } from 'redux'

export type setValidType = (value: React.SetStateAction<boolean>) => void
export type setValueFunc = (value: React.SetStateAction<string>) => void

export type EmailValidationType = {
    inputValue: string
    setvalid: setValidType
    inputsValid: InputsValid
    dispatch: Dispatch<AnyAction>
}
export type PasswordValidationType = {
    setvalidcomf?: setValidType
    setvalid: setValidType
    setPasswordInRange: setValidType
    setPasswordShowMenu: setValidType
    setPasswordHasLowercase: setValidType
    setPasswordHasUppercase: setValidType
    setPasswordHasNumber: setValidType
    setPasswordHasSpecialCharacter: setValidType
    passwordComfirmValue: string
} & EmailValidationType

export type PasswordComfirmValidationType = {
    passwordValue: string
} & EmailValidationType


