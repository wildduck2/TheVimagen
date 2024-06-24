import { emailIllustrate } from '@/assets'
import { Button, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, buttonVariants } from '@/components/ui'
import { Icons } from '@/constants'
import { RootState } from '@/context'
import { useSignupIWthEmailStep2 } from '@/hooks'
import { cn } from '@/utils'
import { Link, useSearch } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export const SignupEmailSetup2 = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const [otp, setOtp] = useState<string>('')

  const { forgetPassword } = useSearch({ from: '/auth/otp-verification-step' }) as { forgetPassword: string }
  const inputOTPRef = useRef<HTMLInputElement>(null)

  const { valid, isLoading, formSubmitionInvoke } = useSignupIWthEmailStep2({ otp, forgetPassword })
  const validClass = `${!valid && 'bg-red-700/5 border-red-700/35'}`

  return (
    <div className="signup__step">
      <Link to="/auth/signup" className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}>
        Sign out
      </Link>
      <div className="otpverification">
        <div className="otpverification__header">
          <img src={emailIllustrate} width={150} />
          <div className="otpverification__header__title">Check your email</div>
          <div className="otpverification__header__description">
            Enter The 6-digit code sent to {user?.email} to continue.
          </div>
        </div>

        <div className="otpverification__content">
          <InputOTP
            maxLength={6}
            ref={inputOTPRef}
            required
            className={validClass}
            onChange={(e) => {
              setOtp(e as string)
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className={validClass} />
              <InputOTPSlot index={1} className={validClass} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} className={validClass} />
              <InputOTPSlot index={3} className={validClass} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} className={validClass} />
              <InputOTPSlot index={5} className={validClass} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button disabled={isLoading} className="flex gap-2" onClick={formSubmitionInvoke} type="submit">
          {isLoading && <Icons.spinner className="spin" />}
          Confirm your Email
        </Button>
      </div>
    </div>
  )
}
