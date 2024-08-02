import { Link, Outlet } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui'
import { AuthSide, ForgetPassword, Signin, Signup } from '@/components/layouts'
import { cn } from '@/utils'
import { LogProps } from './Log.types'

export const Log = ({ type }: LogProps) => {
  return (
    <>
      <div className="auth">
        {type !== 'signin' ? (
          <Link
            to="/auth/signin"
            className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}
          >
            Signin
          </Link>
        ) : (
          <Link
            to="/auth/signup"
            className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}
          >
            Signup
          </Link>
        )}
        <AuthSide />
        <div className="auth__Sign-form">
          {type === 'signin' ? (
            <div>
              <Signin />
            </div>
          ) : type === 'signup' ? (
            <div>
              <Signup />
            </div>
          ) : type === 'forgetpasswrod' ? (
            <div>
              <ForgetPassword />
            </div>
          ) : null}
        </div>
      </div>
      <Outlet />
    </>
  )
}
