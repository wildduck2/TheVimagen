import { emailIllustrate } from '@/assets'
import { Button, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui'
import { Icons } from '@/constants'
import { useSignupIWthEmailStep2 } from '@/hooks'
import { useRef, useState } from 'react'

export const SignupEmailSetup2 = () => {
  const [otp, setOtp] = useState<string>('')

  const inputOTPRef = useRef<HTMLInputElement>(null)

  const { open, isLoading, formSubmitionInvoke } = useSignupIWthEmailStep2({ otp })

  return (
    <div className="signup__step">
      <div className="signup__step__2">
        <div className="signup__step__2__header">
          <img src={emailIllustrate} width={150} />
          <div className="signup__step__2__header__title">Check your email</div>
          <div className="signup__step__2__header__description">
            Enter The 6-digit code sent to {localStorage.getItem('email') ?? 'your email'} to continue.
          </div>
        </div>

        <div className="signup__step__2__content">
          <InputOTP
            maxLength={6}
            ref={inputOTPRef}
            onChange={(e) => {
              setOtp(e as string)
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
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
