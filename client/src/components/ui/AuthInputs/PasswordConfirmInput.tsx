import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../Input'
import { Label } from '../Label'
import { RootState } from '@/context'
import { PasswordConfirmValidation, onPasswordShow } from '@/utils'
import { PasswordInput } from './PasswordInput'

import { BsPatchExclamation } from 'react-icons/bs'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

export type PasswordConfirmInputProps = { isLoading: boolean; passwordRef: React.RefObject<HTMLInputElement> }

export const PasowordConirmInput = ({ isLoading, passwordRef }: PasswordConfirmInputProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [password, setPassword] = useState<string>('')
  const [passwordcomfirmValid, setPasswordconfirmValid] = useState<boolean>(false)
  const [passwordconfirm, setPasswordconfirm] = useState<string>('')
  const [passwordconfirmShow, setPasswordconfirmationShow] = useState<boolean>(false)

  const passwordcomfirmRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <PasswordInput
        isLoading={isLoading}
        password={password}
        setPassword={setPassword}
        passwordConfirmValue={passwordconfirm}
        setPasswordconfirmationValid={setPasswordconfirmValid}
        passwordRef={passwordRef}
      />
      <div>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          id="password-comform"
          className={`${passwordcomfirmValid && 'input-notvalid'}`}
          placeholder="••••••••"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          required
          value={passwordconfirm}
          onChange={({ currentTarget }) => {
            setPasswordconfirm(currentTarget.value)
            PasswordConfirmValidation({
              inputsValid,
              dispatch,
              setvalid: setPasswordconfirmValid,
              inputValue: currentTarget.value,
              passwordValue: password,
            })
          }}
          disabled={isLoading}
          ref={passwordcomfirmRef}
        />
        <div>
          {passwordcomfirmValid && <BsPatchExclamation className="text-red-700" />}
          <button
            type="button"
            onClick={() =>
              onPasswordShow({
                setFunc: setPasswordconfirmationShow,
                passwordRef: passwordcomfirmRef,
                passwordShow: passwordconfirmShow,
              })
            }
          >
            { passwordconfirmShow ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
      </div>
    </>
  )
}
