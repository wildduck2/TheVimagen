import { AnyAction, Dispatch } from 'redux';
import { initialStateTypes } from '../../context/Utils/Utils.types';

export type setvalid = (value: React.SetStateAction<boolean>) => void;
export type setFunc = (value: React.SetStateAction<string>) => void;
export type setValidFunc = (value: React.SetStateAction<boolean>) => void;

export interface validInput {
  password?: string;
  passwordconf?: string;
  inputValue: string;
  setvalid: setvalid;
  setvalidcomf?: setValidFunc;
  setPasswordShowMenu?: setvalid;
  type: string;
  utils: initialStateTypes;
  dispatch: Dispatch<AnyAction>;
}


export interface onPasswordShowProps {
  setFunc: setValidFunc;
  passwordRef: React.RefObject<HTMLInputElement>;
  passwordShow: boolean;
}

export interface onChangeInputProps {
  password?: string;
  passwordconf?: string;
  e: React.ChangeEvent<HTMLInputElement>;
  setFunc: setFunc;
  setvalid: setValidFunc;
  setvalidcomf?: setValidFunc;
  setPasswordShowMenu?: setValidFunc;
  type?: string;
  utils: initialStateTypes;
  dispatch: Dispatch<AnyAction>;
}
