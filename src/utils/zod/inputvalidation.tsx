import { validInput } from './zod.types';
import { checkInputsValid } from '../../context/Utils/Utils';
import {
  emailSchema,
  passwordInRange,
  passwordhaslowercase,
  passwordhasnumber,
  passwordhasspecialcharacter,
  passwordhasuppercase,
} from '../../constants';

export const validateInput = ({
  setvalid,
  type,
  passwordconf,
  setvalidcomf,
  inputValue,
  password,
  dispatch,
  utils,
  setPasswordShowMenu,
  setPasswordHasLowercase,
  setPasswordHasUppercase,
  setPasswordHasNumber,
  setPasswordHasSpecialCharacter,
  setPasswordInRange,
}: validInput) => {
  const parsedValidEmail = emailSchema.safeParse(inputValue);
  const passwordInRangee = passwordInRange.safeParse(inputValue);
  const passwordhasuppercasee = passwordhasuppercase.safeParse(inputValue);
  const passwordhaslowercasee = passwordhaslowercase.safeParse(inputValue);
  const passwordhasnumbere = passwordhasnumber.safeParse(inputValue);
  const passwordhasspecialcharactere = passwordhasspecialcharacter.safeParse(inputValue);

  console.log(passwordInRangee, passwordhasuppercasee, passwordhaslowercasee, passwordhasnumbere);

  const parsedValidPassword =
    passwordInRangee.success &&
    passwordhasuppercasee.success &&
    passwordhaslowercasee.success &&
    passwordhasnumbere.success &&
    passwordhasspecialcharactere.success;

  if (type === 'email') {
    if (parsedValidEmail.success) {
      setvalid(false);

      dispatch(
        checkInputsValid({
          ...utils.inputsValid,
          email: parsedValidEmail ? true : false,
        }),
      );
    } else {
      setvalid(true);

      dispatch(
        checkInputsValid({
          ...utils.inputsValid,
          email: false,
        }),
      );
    }
  }

  if (type === 'password') {
    console.log('fucl upi');

    if (passwordconf) {
      if (passwordconf === inputValue && passwordconf === '') {
        setvalidcomf!(false);
      } else if (passwordconf === inputValue && passwordconf !== '') {
        setvalidcomf!(false);
      } else if (passwordconf !== inputValue && passwordconf !== '') {
        setvalidcomf!(true);
      }
    }

    if (passwordInRangee.success.valueOf()) {
      setPasswordInRange!(true);
    } else {
      setPasswordInRange!(false);
    }
    if (passwordhaslowercasee.success.valueOf()) {
      setPasswordHasLowercase!(true);
    } else {
      setPasswordHasLowercase!(false);
    }
    if (passwordhasuppercasee.success.valueOf()) {
      setPasswordHasUppercase!(true);
    } else {
      setPasswordHasUppercase!(false);
    }
    if (passwordhasnumbere.success.valueOf()) {
      setPasswordHasNumber!(true);
    } else {
      setPasswordHasNumber!(false);
    }
    if (passwordhasspecialcharactere.success.valueOf()) {
      setPasswordHasSpecialCharacter!(true);
    } else {
      setPasswordHasSpecialCharacter!(false);
    }
    if (parsedValidPassword) {
      setvalid(false);
      setPasswordShowMenu!(false);

      dispatch(
        checkInputsValid({
          email: utils.inputsValid.email,
          password: parsedValidPassword ? true : false,
          passwordcomfirmation: utils.inputsValid.passwordcomfirmation,
        }),
      );
    } else {
      setvalid(true);

      setPasswordShowMenu!(true);
      dispatch(
        checkInputsValid({
          email: utils.inputsValid.email,
          password: false,
          passwordcomfirmation: utils.inputsValid.passwordcomfirmation,
        }),
      );
    }
  }

  if (type === 'passwordcomfirmation') {
    if (password === inputValue) {
      setvalid(false);

      dispatch(
        checkInputsValid({
          email: utils.inputsValid.email,
          password: utils.inputsValid.password,
          passwordcomfirmation: true,
        }),
      );
    } else if (password !== inputValue) {
      setvalid(true);

      dispatch(
        checkInputsValid({
          email: utils.inputsValid.email,
          password: utils.inputsValid.password,
          passwordcomfirmation: false,
        }),
      );
    }
  }
};
