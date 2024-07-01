import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../Input'
import { Label } from '../Label'
import { UserNameValidation } from '@/utils'
import { RootState } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

export interface UserNameInputPorps {
  isLoading: boolean
  userNameRef: React.RefObject<HTMLInputElement>
}

export const UserNameInput = ({ isLoading, userNameRef: emailRef }: UserNameInputPorps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
  const dispatch = useDispatch()

  const [userNameValid, setUserNameValid] = useState<boolean>(true)
  const [userName, setUserName] = useState<string>('')

  const debounceValue = useDebounce(userName)

  useEffect(() => {
    //NOTE: debouncing the input on change
    UserNameValidation({
      inputValue: debounceValue,
      setvalid: setUserNameValid,
      inputsValid,
      dispatch,
    })
  }, [debounceValue])

  return (
    <>
      <div>
        <Label htmlFor="userName">Email</Label>
        <Input
          id="userName"
          className={`${!userNameValid && 'input-notvalid'}`}
          placeholder="wildduck2"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          value={userName}
          disabled={isLoading}
          onChange={({ currentTarget }) => {
            setUserName(() => currentTarget.value)
          }}
          required
          ref={emailRef}
        />
        <div>{!userNameValid && <Icon.execlmation className="h-4 w-4 text-red-700" />}</div>
      </div>
      <p className={userNameValid ? 'hide' : 'active'}>userName is not valid</p>
    </>
  )
}
