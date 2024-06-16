import {
  emailSchema,
  passwordInRange,
  passwordhaslowercase,
  passwordhasnumber,
  passwordhasspecialcharacter,
  passwordhasuppercase,
} from '@/constants'
import { checkInputsValid } from '@/context'
import { EmailValidationType, PasswordComfirmValidationType, PasswordValidationType } from './inputValidation.types'

export const EmailValidation = ({ setvalid, inputsValid, inputValue, dispatch }: EmailValidationType) => {
  const parsedValidEmail = emailSchema.safeParse(inputValue)
  const { password, passwordComfirm } = inputsValid

  setvalid(parsedValidEmail.success ? false : true)
  dispatch(
    checkInputsValid({
      email: parsedValidEmail ? true : false,
      password,
      passwordComfirm,
    }),
  )
}

export const PasswordValidation = ({
  passwordComfirmValue,
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
  setvalidcomf,
}: PasswordValidationType) => {
  const { email, passwordComfirm } = inputsValid
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

  if (passwordComfirmValue) {
    if (passwordComfirmValue === inputValue && passwordComfirmValue === '') {
      setvalidcomf!(false)
    } else if (passwordComfirmValue === inputValue && passwordComfirmValue !== '') {
      setvalidcomf!(false)
    } else if (passwordComfirmValue !== inputValue && passwordComfirmValue !== '') {
      setvalidcomf!(true)
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
      email,
      password: parsedValidPassword ? true : false,
      passwordComfirm,
    }),
  )
}

export const PasswordComfirmValidation = ({
  setvalid,
  passwordValue,
  inputValue,
  dispatch,
  inputsValid,
}: PasswordComfirmValidationType) => {
  const { email, password } = inputsValid
  setvalid(passwordValue === inputValue ? false : true)

  dispatch(
    checkInputsValid({
      email,
      password,
      passwordComfirm: passwordValue === inputValue ? true : false,
    }),
  )
}
