import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Input, Label } from '@/components/ui'
import { UserAuthFormProps } from '@/components/pages'
import { RootState } from '@/context'
import { Icons, } from '@/constants'
import { onPasswordShow } from '@/utils'
import { useSigninWithEmail } from '@/hooks'

import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { BsPatchExclamation } from 'react-icons/bs'

export const Signin = ({ ...props }: UserAuthFormProps) => {
    const route = useNavigate()

    const utils = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch()

    const [notValid, setNotValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { authEmail } = useSigninWithEmail({
        email: emailRef.current?.value as string,
        password: passwordRef.current?.value as string,
        dispatch,
        setIsLoading,
        route,
    })

    // const { creditValidGithub, authGithub } = useSigninwithGithub({
    //     dispatch,
    //     setIsLoading,
    //     setEmailValid,
    //     setPasswordValid,
    //     route,
    // })

    useEffect(() => {
        setNotValid(utils.inputsValid.email && utils.inputsValid.password ? true : false)
    }, [dispatch, emailValid, passwordValid, utils])


    return (
        <div className="signup" {...props}>
            <form onSubmit={authEmail}>
                <div>
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
                            onChange={({ currentTarget }) => { setEmail(currentTarget.value) }}
                            required
                            ref={emailRef}
                        />
                        <div>{emailValid && <BsPatchExclamation className="h-4 w-4 text-red-700" />}</div>
                    </div>
                    <p className={!emailValid ? 'hide' : 'active'}>Email address not recognized, invalid.</p>
                    <div>
                        <Label htmlFor="password">Email</Label>
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
                            onChange={({ currentTarget }) => { setPassword(currentTarget.value) }}
                            disabled={isLoading}
                            ref={passwordRef}
                        />
                        <div>
                            {passwordValid && <BsPatchExclamation className="text-red-700" />}
                            <button
                                type="button"
                                onClick={() => onPasswordShow({ setFunc: setPasswordShow, passwordRef, passwordShow })}
                            >
                                {passwordShow ? <RiEyeLine /> : <RiEyeOffLine />}
                            </button>
                        </div>
                    </div>
                    <p className={!passwordValid ? 'hide' : 'active'}> Invalid password, access denied.</p>
                    <Button disabled={isLoading || notValid}>
                        {isLoading && <Icons.spinner />}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div>
                <div>
                    <span />
                </div>
                <div>
                    <span>Or continue with</span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => { }}>
                {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.gitHub />} Github
            </Button>
        </div>
    )
}

