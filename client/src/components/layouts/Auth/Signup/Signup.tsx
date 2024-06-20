import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { EmailInput, Button, PasowordConirmInput, UserNameInput } from '@/components/ui'
import { Icons } from '@/constants'
import { RootState } from '@/context'
import { UserAuthFormProps } from '@/components/pages'
import { useSignupWithEmail } from '@/hooks'

export const Signup = ({ ...props }: UserAuthFormProps) => {
  const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notValid, setNotValid] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const userNameRef = useRef<HTMLInputElement>(null)

  const { authEmail } = useSignupWithEmail({
    email: emailRef.current?.value as string,
    password: passwordRef.current?.value as string,
    setIsLoading,
  })

  useEffect(() => {
    setNotValid(
      inputsValid.userName && inputsValid.email && inputsValid.password && inputsValid.passwordConfirm ? true : false,
    )
  }, [inputsValid])

  return (
    <>
      <div className="auth__Sign-form">
        <div>
          <div>
            <h1>Create an account</h1>
            <p>Enter your email below to create your account</p>
          </div>
          <div className="auth__form signup" {...props}>
            <form onSubmit={authEmail}>
              <div>
                <UserNameInput isLoading={isLoading} userNameRef={userNameRef} />
                <EmailInput
                  isLoading={isLoading}
                  emailRef={emailRef}
                  emailValid={emailValid}
                  setEmailValid={setEmailValid}
                  email={email}
                  setEmail={setEmail}
                />
                <PasowordConirmInput isLoading={isLoading} passwordRef={passwordRef} />

                <Button disabled={isLoading || !notValid}>
                  {isLoading && <Icons.spinner />}
                  Sign Up with Email
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
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => {}}>
              {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.gitHub />} Github
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
