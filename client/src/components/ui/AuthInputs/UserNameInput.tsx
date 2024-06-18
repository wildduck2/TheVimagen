import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../Input'
import { Label } from '../Label'
import { UserNameValidation, UserNameValidationType } from '@/utils'
import { RootState, checkInputsValid } from '@/context'

import { BsPatchExclamation } from 'react-icons/bs'
import { debounce } from 'lodash'
import { useDebounce } from '@/hooks'

export interface UserNameInputPorps {
    isLoading: boolean
    userNameRef: React.RefObject<HTMLInputElement>
}

export const UserNameInput = ({ isLoading, userNameRef: emailRef }: UserNameInputPorps) => {
    const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
    const dispatch = useDispatch()

    const [userNameValid, setUserNameValid] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('')
    const [userNameDebounce, setUserNameDebounce] = useState<string>('')


    const debounceDispatch = useDebounce(userName)

    useEffect(() => {
        //NOTE: debouncing the input on change 
        // setUserNameDebounce(() => debounceDispatch)
        UserNameValidation({
            inputValue: debounceDispatch,
            setvalid: setUserNameValid,
            inputsValid,
            dispatch,
        })

    }, [debounceDispatch])

    return (
        <>
            <div>
                <Label htmlFor="userName">Email</Label>
                <Input
                    id="userName"
                    className={`${userNameValid && 'input-notvalid'}`}
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
                <div>{userNameValid && <BsPatchExclamation className="h-4 w-4 text-red-700" />}</div>
            </div>
            <p className={!userNameValid ? 'hide' : 'active'}>userName is not valid</p>
        </>
    )
}
