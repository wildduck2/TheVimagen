import { onPasswordShowProps } from './passwordShow.types'

export const onPasswordShow = ({ setFunc, passwordRef, passwordShow }: onPasswordShowProps) => {
  setFunc(!passwordShow)
  const el = passwordRef.current
  el?.type === 'password' ? (el.type = 'text') : (el!.type = 'password')
}
