import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { passwordrules } from '@/constants'
import { RootState } from '@/context'
import { PasswordValidation, onPasswordShow, setValidType, setValueFunc } from '@/utils'
import { Label, Input } from '..'

import { BsPatchExclamation } from 'react-icons/bs'
import { GiPlainCircle } from 'react-icons/gi'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { useDebounce } from '@/hooks'

type PasswordInputProps = {
  isLoading: boolean
  password: string
  setPassword: setValueFunc
  setPasswordconfirmationValid?: setValidType
  passwordValid: boolean
  setPasswordValid: setValidType
  passwordConfirmValue?: string
  passwordRef: React.RefObject<HTMLInputElement>
  login: boolean
}

export const PasswordInput = ({
  isLoading,
  password,
  setPassword,
  setPasswordconfirmationValid,
  passwordConfirmValue,
  passwordValid,
  setPasswordValid,
  passwordRef,
  login,
}: PasswordInputProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [passwordShow, setPasswordShow] = useState<boolean>(false)
  const [passwordShowMenu, setPasswordShowMenu] = useState<boolean>(false)
  const [passwordHasLowercase, setPasswordHasLowercase] = useState<boolean>(false)
  const [passwordHasUppercase, setPasswordHasUppercase] = useState<boolean>(false)
  const [passwordHasNumber, setPasswordHasNumber] = useState<boolean>(false)
  const [passwordHasSpecialCharacter, setPasswordHasSpecialCharacter] = useState<boolean>(false)
  const [passwordInRange, setPasswordInRange] = useState<boolean>(false)
  useState<boolean>(false)

  const debounceValue = useDebounce(password)

  useEffect(() => {
    //NOTE: debouncing the input on change
    !login &&
      PasswordValidation({
        inputsValid,
        dispatch,
        inputValue: debounceValue,
        setvalid: setPasswordValid,
        setvalidconf: setPasswordconfirmationValid,
        setPasswordShowMenu,
        setPasswordInRange,
        passwordConfirmValue,
        setPasswordHasNumber,
        setPasswordHasLowercase,
        setPasswordHasUppercase,
        setPasswordHasSpecialCharacter,
      })
  }, [debounceValue])

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
          onChange={({ currentTarget }) => setPassword(() => currentTarget.value)}
          disabled={isLoading}
          ref={passwordRef}
          onFocus={() => setPasswordShowMenu(true)}
        />
        <div>
          {passwordValid && <BsPatchExclamation className="text-red-700" />}
          <button type="button" onClick={() => onPasswordShow({ setFunc: setPasswordShow, passwordRef, passwordShow })}>
            {passwordShow ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
      </div>
      <p className={!passwordValid ? 'hide' : 'active'}> Password is not valid</p>
      <div className={`password-rules ${passwordValid && passwordShowMenu && !login ? 'active' : 'hide'} `}>
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
