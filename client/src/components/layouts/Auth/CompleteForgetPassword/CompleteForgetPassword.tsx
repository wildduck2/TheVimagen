import { useRef } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button, PasowordConirmInput, buttonVariants } from '@/components/ui'
import { Icons } from '@/constants'
import { cn } from '@/utils'
import { changePassword, compelted } from '@/assets'
import { useCompleteForgetPassword } from '@/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export const CompleteForgetPassword = () => {
  const route = useNavigate()
  const inputValid = useSelector((state: RootState) => state.utils.inputsValid)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)

  const { isLoading, updatePasswordInvoke, done } = useCompleteForgetPassword({
    password: passwordRef.current?.value as string,
    confirmPassword: passwordConfirmRef.current?.value as string,
  })
  console.log(isLoading)

  return (
    <>
      <div className="signup__step">
        <Link to="/auth/signup" className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}>
          Sign out
        </Link>
        <div className="complete__forget__password">
          {done ? (
            <div className="complete__forget__password__content auth__form">
              <div className="complete__forget__password__header__title">Password Recovary Completed</div>
              <img src={compelted} className="h-[200px]" />
            </div>
          ) : (
            <div className="complete__forget__password__header">
              <div className="complete__forget__password__header__title">Complete Forget Password Recovary</div>
              <img src={changePassword} className="h-[200px]" />
            </div>
          )}
          <div className="complete__forget__password__content auth__form">
            <form className="complete__forget__password__content__form" onSubmit={updatePasswordInvoke}>
              {done ? (
                <Button
                  disabled={!(inputValid.password && inputValid.passwordConfirm) || isLoading}
                  type="button"
                  onClick={() => route({ to: '/dashboard/Home' })}
                >
                  {isLoading && <Icons.spinner className="spin" />}
                  Continue
                </Button>
              ) : (
                <>
                  <div className="complete__forget__password__content__form__row1">
                    <PasowordConirmInput
                      isLoading={isLoading}
                      passwordRef={passwordRef}
                      passwordConfirmRef={passwordConfirmRef}
                    />
                  </div>
                  <Button disabled={!(inputValid.password && inputValid.passwordConfirm) || isLoading} type="submit">
                    {isLoading && <Icons.spinner className="spin" />}
                    Reset Password
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
