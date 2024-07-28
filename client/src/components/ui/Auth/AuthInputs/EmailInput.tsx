import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Label } from '../..'
import { EmailValidation, setValidType, setValueFunc } from '@/utils'
import { RootState } from '@/context'

import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

export interface EmailInputPorps {
  isLoading: boolean
  emailRef: React.RefObject<HTMLInputElement>
  emailValid: boolean
  setEmailValid: setValidType
  email: string
  setEmail: setValueFunc
}

export const EmailInput = ({ isLoading, emailRef, emailValid, setEmailValid, email, setEmail }: EmailInputPorps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  //NOTE: debouncing the input on change
  useCallback(
    () =>
      useDebounce(() =>
        EmailValidation({
          inputValue: email,
          setvalid: setEmailValid,
          inputsValid,
          dispatch,
        }),
      ),
    [],
  )

  return (
    <>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          className={`${emailValid && 'input-notvalid'}`}
          placeholder="wild@duck.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          value={email}
          disabled={isLoading}
          onChange={({ currentTarget }) => {
            setEmail(() => currentTarget.value)
          }}
          required
          ref={emailRef}
        />
        <div>{emailValid && <Icon.execlmation className="h-4 w-4 text-red-700" />}</div>
      </div>
      <p className={!emailValid ? 'hide' : 'active'}>Email is not valid</p>
    </>
  )
}
