import { useRef, useState } from 'react'
import { Input } from '../Input'
import { Label } from '../Label'
import { BsPatchExclamation } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/context'
import { EmailValidation } from '@/utils'

export interface EmailInputPorps {
    isLoading: boolean
}

export const EmailInput = ({ isLoading }: EmailInputPorps) => {
    const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
    const dispatch = useDispatch()

    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

    const emailRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    className={`${emailValid && 'input-notvalid'}`}
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={email}
                    disabled={isLoading}
                    onChange={({ currentTarget }) => {
                        setEmail(currentTarget.value)
                        EmailValidation({
                            inputValue: currentTarget.value,
                            setvalid: setEmailValid,
                            inputsValid,
                            dispatch,
                        })
                    }}
                    required
                    ref={emailRef}
                />
                <div>{emailValid && <BsPatchExclamation className="h-4 w-4 text-red-700" />}</div>
            </div>
            <p className={!emailValid ? 'hide' : 'active'}>Email is not valid</p>
        </>
    )
}
