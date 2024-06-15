import { setValidFunc } from "../inputValidation"

export interface onPasswordShowProps {
  setFunc: setValidFunc
  passwordRef: React.RefObject<HTMLInputElement>
  passwordShow: boolean
}
