import { validateInput, onChangeInputProps } from '..';

export const onChangeInput = async ({
  e,
  setFunc,
  setvalid,
  setvalidcomf,
  setPasswordShowMenu,
  setPasswordHasLowercase,
  setPasswordHasNumber,
  setPasswordHasSpecialCharacter,
  setPasswordHasUppercase,
  setPasswordInRange,
  type,
  password,
  passwordconf,
  utils,
  dispatch,
}: onChangeInputProps) => {
  setFunc(e.target.value);
  setvalid(true);

  if (type === 'email') {
    validateInput({ inputValue: e.target.value, setvalid, type, dispatch, utils });
  }

  if (type === 'password') {
    validateInput({
      inputValue: e.target.value,
      passwordconf,
      password,
      setvalidcomf,
      setvalid,
      type,
      dispatch,
      utils,
      setPasswordShowMenu,
      setPasswordHasLowercase,
      setPasswordHasNumber,
      setPasswordHasSpecialCharacter,
      setPasswordHasUppercase,
      setPasswordInRange,
    });
  }

  if (type === 'passwordcomfirmation') {
    validateInput({
      inputValue: e.target.value,
      passwordconf,
      password,
      setvalidcomf,
      setvalid,
      type,
      dispatch,
      utils,
      setPasswordShowMenu,
    });
  }
};
