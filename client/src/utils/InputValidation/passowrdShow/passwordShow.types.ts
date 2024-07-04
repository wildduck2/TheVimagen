import { setValidType } from '../inputValidation'

export interface onPasswordShowProps {
  setFunc: setValidType
  passwordRef: React.RefObject<HTMLInputElement>
  passwordShow: boolean
}
