import { Button, EmailInput } from '@/components/ui'
import { Icons } from '@/constants'
import { useForgetPasswordEmail } from '@/hooks'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const emailRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  const forgetPassword = useForgetPasswordEmail({
    setIsLoading,
    email,
  })

  return (
    <div className="auth__Sign-form">
      <div>
        <div>
          <h1>Forget Password</h1>
          <p>Enter your data below to reset your account</p>
        </div>

        <div className="auth__form signin">
          <form onSubmit={forgetPassword}>
            <div>
              <EmailInput
                isLoading={isLoading}
                emailRef={emailRef}
                emailValid={emailValid}
                setEmailValid={setEmailValid}
                email={email}
                setEmail={setEmail}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="spin" />}
                Continue
              </Button>
              <Button className="continue__with" type="button" variant={'outline'} disabled={isLoading}>
                {isLoading && <Icons.spinner className="spin" />}
                User userName instead
              </Button>
            </div>
          </form>
        </div>

        <p>
          By clicking continue, you agree to our <Link to="/terms">Terms of Service</Link> and
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
