import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Label } from '../..'
import { RootState } from '@/context'
import { PasswordConfirmValidation, onPasswordShow } from '@/utils'
import { PasswordInput } from './PasswordInput'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

export type PasswordConfirmInputProps = {
  isLoading: boolean
  passwordRef: React.RefObject<HTMLInputElement>
  passwordConfirmRef: React.RefObject<HTMLInputElement>
}

export const PasowordConirmInput = ({ isLoading, passwordRef, passwordConfirmRef }: PasswordConfirmInputProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [password, setPassword] = useState<string>('')
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [passwordconfirmValid, setPasswordconfirmValid] = useState<boolean>(false)
  const [passwordconfirm, setPasswordconfirm] = useState<string>('')
  const [passwordconfirmShow, setPasswordconfirmationShow] = useState<boolean>(false)

  useEffect(() => {
    //NOTE: debouncing the input on change
    useDebounce(() =>
      PasswordConfirmValidation({
        inputsValid,
        dispatch,
        setvalid: setPasswordconfirmValid,
        inputValue: passwordconfirm,
        passwordValue: password,
      }),
    )
  }, [])

  return (
    <>
      <PasswordInput
        isLoading={isLoading}
        password={password}
        setPassword={setPassword}
        passwordConfirmValue={passwordconfirm}
        setPasswordconfirmationValid={setPasswordconfirmValid}
        passwordRef={passwordRef}
        setPasswordValid={setPasswordValid}
        passwordValid={passwordValid}
        login={false}
      />
      <div>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          id="password-comform"
          className={`${passwordconfirmValid && 'input-notvalid'}`}
          placeholder="••••••••"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          required
          value={passwordconfirm}
          onChange={({ currentTarget }) => {
            setPasswordconfirm(() => currentTarget.value)
          }}
          disabled={isLoading}
          ref={passwordConfirmRef}
        />
        <div>
          {passwordconfirmValid && <Icon.execlmation className="text-red-700" />}
          <button
            type="button"
            onClick={() =>
              onPasswordShow({
                setFunc: setPasswordconfirmationShow,
                passwordRef: passwordConfirmRef,
                passwordShow: passwordconfirmShow,
              })
            }
          >
            {passwordconfirmShow ? <Icon.eyeOpen /> : <Icon.eyeOff />}
          </button>
        </div>
      </div>
      <p className={!passwordconfirmValid ? 'hide' : 'active'}> Password confirm is not valid</p>
    </>
  )
}
