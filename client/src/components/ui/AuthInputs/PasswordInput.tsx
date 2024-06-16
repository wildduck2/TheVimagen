import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { passwordrules } from '@/constants'
import { RootState } from '@/context'
import { PasswordValidation, onPasswordShow, setValidType, setValueFunc } from '@/utils'
import { Label, Input } from '..'

import { BsPatchExclamation } from 'react-icons/bs'
import { GiPlainCircle } from 'react-icons/gi'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

type PasswordInputProps = {
  isLoading: boolean
  password: string
  setPassword: setValueFunc
  setPasswordcomfirmationValid: setValidType
  passwordComfirmValue: string
  passwordRef: React.RefObject<HTMLInputElement>
}

export const PasswordInput = ({
  isLoading,
  password,
  setPassword,
  setPasswordcomfirmationValid,
  passwordComfirmValue,
  passwordRef,
}: PasswordInputProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [passwordShow, setPasswordShow] = useState<boolean>(false)
  const [passwordShowMenu, setPasswordShowMenu] = useState<boolean>(false)
  const [passwordHasLowercase, setPasswordHasLowercase] = useState<boolean>(false)
  const [passwordHasUppercase, setPasswordHasUppercase] = useState<boolean>(false)
  const [passwordHasNumber, setPasswordHasNumber] = useState<boolean>(false)
  const [passwordHasSpecialCharacter, setPasswordHasSpecialCharacter] = useState<boolean>(false)
  const [passwordInRange, setPasswordInRange] = useState<boolean>(false)
  useState<boolean>(false)

  return (
    <>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          className={`${passwordValid && 'input-notvalid'}`}
          placeholder="••••••••"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          required
          value={password}
          onChange={({ currentTarget }) => {
            setPassword(currentTarget.value)
            PasswordValidation({
              inputsValid,
              dispatch,
              inputValue: currentTarget.value,
              setvalid: setPasswordValid,
              setvalidcomf: setPasswordcomfirmationValid,
              setPasswordShowMenu,
              setPasswordInRange,
              passwordComfirmValue,
              setPasswordHasNumber,
              setPasswordHasLowercase,
              setPasswordHasUppercase,
              setPasswordHasSpecialCharacter,
            })
          }}
          disabled={isLoading}
          ref={passwordRef}
          onFocus={() => {
            setPasswordShowMenu(true)
          }}
        />
        <div>
          {passwordValid && <BsPatchExclamation className="text-red-700" />}
          <button type="button" onClick={() => onPasswordShow({ setFunc: setPasswordShow, passwordRef, passwordShow })}>
            {passwordShow ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
      </div>
      <p className={!passwordValid ? 'hide' : 'active'}> Password is not valid</p>
      <div className={`password-rules ${passwordValid && passwordShowMenu ? 'active' : 'hide'} `}>
        <ul>
          {passwordrules.map((rule) => (
            <li key={rule.id}>
              <GiPlainCircle
                className={`${passwordValid && 'red'}  
                                             ${passwordHasUppercase && rule.id === 1 && 'green'}
                                             ${passwordHasLowercase && rule.id === 2 && 'green'}
                                             ${passwordHasNumber && rule.id === 3 && 'green'}
                                             ${passwordHasSpecialCharacter && rule.id === 4 && 'green'}
                                             ${passwordInRange && rule.id === 5 && 'green'}
                                        `}
              />
              <span>{rule.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
