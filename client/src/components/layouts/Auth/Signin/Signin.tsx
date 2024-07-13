import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'

import { Button, EmailInput, PasswordInput } from '@/components/ui'
import { UserAuthFormProps } from '@/components/pages'
import { RootState, checkInputsValid } from '@/context'
import { Icons } from '@/constants'
import { useSigninWithEmail, useSigninWithGoogle } from '@/hooks'
// import { google_icon } from '@/assets'

export const Signin = ({ ...props }: UserAuthFormProps) => {
  const route = useNavigate()

  const utils = useSelector((state: RootState) => state.utils)
  const dispatch = useDispatch()

  const [notValid, setNotValid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { authEmail } = useSigninWithEmail({
    email: emailRef.current?.value as string,
    password: passwordRef.current?.value as string,
    setIsLoading,
    setEmailValid,
    setPasswordValid,
  })

  const { authEmail: AuthGoogle } = useSigninWithGoogle({ setIsLoading })

  useEffect(() => {
    dispatch(checkInputsValid({ password: false, email: false, userName: false, passwordConfirm: false }))
  }, [route])

  useEffect(() => {
    setNotValid(utils.inputsValid.email && utils.inputsValid.password ? true : false)
  }, [dispatch, emailValid, passwordValid, utils])

  return (
    <div className="auth__Sign-form">
      <div>
        <div>
          <h1>Welcome back</h1>
          <p>Enter your data below to signin your account</p>
        </div>

        <div
          className="auth__form signin"
          {...props}
        >
          <form onSubmit={authEmail}>
            <div>
              <EmailInput
                isLoading={isLoading}
                emailRef={emailRef}
                emailValid={emailValid}
                setEmailValid={setEmailValid}
                setEmail={setEmail}
                email={email}
              />
              {
                // <PasswordInput
                //   isLoading={isLoading}
                //   passwordRef={passwordRef}
                //   password={password}
                //   setPassword={setPassword}
                //   setPasswordValid={setPasswordValid}
                //   passwordValid={passwordValid}
                //   login={true}
                // />
              }
              <Button
                className="forget__password"
                variant={'link'}
                type="button"
                onClick={() => route({ to: '/auth/forget-password' })}
              >
                Forget Passowrd
              </Button>
              <Button
                type="submit"
                disabled={isLoading || notValid}
              >
                {isLoading && <Icons.spinner className="spin" />}
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className="Oauth__buttons">
            <div>
              <span />
            </div>
            <div>
              <span>Or continue with</span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={AuthGoogle}
          >
            {isLoading ? <Icons.spinner className="animate-spin" /> : <img src={''} />}Google
          </Button>
        </div>

        <p>
          By clicking continue, you agree to our <Link>Terms of Service</Link> and
          <Link>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
