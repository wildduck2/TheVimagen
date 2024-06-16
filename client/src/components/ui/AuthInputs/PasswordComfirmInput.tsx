import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../Input'
import { Label } from '../Label'
import { RootState } from '@/context'
import { PasswordComfirmValidation, onPasswordShow } from '@/utils'
import { PasswordInput } from './PasswordInput'

import { BsPatchExclamation } from 'react-icons/bs'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

export type PasswordComfirmInputProps = { isLoading: boolean; passwordRef: React.RefObject<HTMLInputElement> }

export const PasowordComirmInput = ({ isLoading, passwordRef }: PasswordComfirmInputProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [password, setPassword] = useState<string>('')
  const [passwordcomfirmValid, setPasswordcomfirmValid] = useState<boolean>(false)
  const [passwordcomfirm, setPasswordcomfirm] = useState<string>('')
  const [passwordcomfirmShow, setPasswordcomfirmationShow] = useState<boolean>(false)

  const passwordcomfirmRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <PasswordInput
        isLoading={isLoading}
        password={password}
        setPassword={setPassword}
        passwordComfirmValue={passwordcomfirm}
        setPasswordcomfirmationValid={setPasswordcomfirmValid}
        passwordRef={passwordRef}
      />
      <div>
        <Label htmlFor="password">Password Comfirmation</Label>
        <Input
          id="password-comform"
          className={`${passwordcomfirmValid && 'input-notvalid'}`}
          placeholder="••••••••"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          required
          value={passwordcomfirm}
          onChange={({ currentTarget }) => {
            setPasswordcomfirm(currentTarget.value)
            PasswordComfirmValidation({
              inputsValid,
              dispatch,
              setvalid: setPasswordcomfirmValid,
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
                setFunc: setPasswordcomfirmationShow,
                passwordRef: passwordcomfirmRef,
                passwordShow: passwordcomfirmShow,
              })
            }
          >
            {!passwordcomfirmShow ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
      </div>
    </>
  )
}
