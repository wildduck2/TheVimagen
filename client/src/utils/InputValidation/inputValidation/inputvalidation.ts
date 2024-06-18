import {
    emailSchema,
    passwordInRange,
    passwordhaslowercase,
    passwordhasnumber,
    passwordhasspecialcharacter,
    passwordhasuppercase,
} from '@/constants'
import { checkInputsValid } from '@/context'
import {
    EmailValidationType,
    PasswordConfirmValidationType,
    PasswordValidationType,
    UserNameValidationType,
} from './inputValidation.types'
import { toast } from 'sonner'
import axios from 'axios'

export const EmailValidation = ({ setvalid, inputsValid, inputValue, dispatch }: EmailValidationType) => {
    const parsedValidEmail = emailSchema.safeParse(inputValue)
    const { userName, password, passwordConfirm } = inputsValid

    setvalid(parsedValidEmail.success ? false : true)
    dispatch(
        checkInputsValid({
            userName,
            email: parsedValidEmail ? true : false,
            password,
            passwordConfirm,
        }),
    )
}

export const PasswordValidation = ({
    passwordConfirmValue,
    inputsValid,
    setvalid,
    inputValue,
    dispatch,
    setPasswordInRange,
    setPasswordShowMenu,
    setPasswordHasNumber,
    setPasswordHasLowercase,
    setPasswordHasUppercase,
    setPasswordHasSpecialCharacter,
    setvalidconf,
}: PasswordValidationType) => {
    const { userName, email, passwordConfirm } = inputsValid
    const passwordInRangee = passwordInRange.safeParse(inputValue)
    const passwordhasuppercasee = passwordhasuppercase.safeParse(inputValue)
    const passwordhaslowercasee = passwordhaslowercase.safeParse(inputValue)
    const passwordhasnumbere = passwordhasnumber.safeParse(inputValue)
    const passwordhasspecialcharactere = passwordhasspecialcharacter.safeParse(inputValue)

    const parsedValidPassword =
        passwordInRangee.success &&
        passwordhasuppercasee.success &&
        passwordhaslowercasee.success &&
        passwordhasnumbere.success &&
        passwordhasspecialcharactere.success

    if (passwordConfirmValue) {
        if (passwordConfirmValue === inputValue && passwordConfirmValue === '') {
            setvalidconf!(false)
        } else if (passwordConfirmValue === inputValue && passwordConfirmValue !== '') {
            setvalidconf!(false)
        } else if (passwordConfirmValue !== inputValue && passwordConfirmValue !== '') {
            setvalidconf!(true)
        }
    }

    setPasswordInRange(passwordInRangee.success.valueOf() ? true : true)
    setPasswordHasLowercase(passwordhaslowercasee.success.valueOf() ? true : false)
    setPasswordHasUppercase(passwordhasuppercasee.success.valueOf() ? true : false)
    setPasswordHasNumber(passwordhasnumbere.success.valueOf() ? true : false)
    setPasswordHasSpecialCharacter(passwordhasspecialcharactere.success.valueOf() ? true : false)

    setvalid(parsedValidPassword ? false : true)
    setPasswordShowMenu!(parsedValidPassword ? false : true)

    dispatch(
        checkInputsValid({
            userName,
            email,
            password: parsedValidPassword ? true : false,
            passwordConfirm,
        }),
    )
}

export const PasswordConfirmValidation = ({
    setvalid,
    passwordValue,
    inputValue,
    dispatch,
    inputsValid,
}: PasswordConfirmValidationType) => {
    const { userName, email, password } = inputsValid
    setvalid(passwordValue === inputValue ? false : true)

    dispatch(
        checkInputsValid({
            userName,
            email,
            password,
            passwordConfirm: passwordValue === inputValue ? true : false,
        }),
    )
}

export const UserNameValidation = async ({ inputValue, dispatch, setvalid, inputsValid }: UserNameValidationType) => {
    const { email, password, passwordConfirm } = inputsValid
    try {

        if (inputValue === '') return
        console.log(inputValue)

        //NOTE: Checking the userName Available 
        const { data, statusText } = await axios.post(`${process.env.ROOT_URL}/auth/userNameExist`, {
            userName: inputValue,
        }, { withCredentials: true })

        setvalid(data.valid === true || statusText !== 'OK' ? false : true)
        dispatch(checkInputsValid({
            userName: data.valid === true || statusText !== 'OK' ? true : false,
            email,
            password,
            passwordConfirm,
        }))
    } catch (error) {
        toast.error(`couldn't verify the userName try again!`)
        console.log(error)
    }
}
