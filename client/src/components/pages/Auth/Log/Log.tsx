import { Link, Outlet } from 'react-router-dom'

import { buttonVariants } from '@/components/ui'
import { Signup } from '@/components/layouts'
import { cn } from '@/utils'

import { DiVim } from 'react-icons/di'

export const Log = ({ type }: { type: string }) => {
  return (
    <>
      <div className="auth">
        {type !== 'signin' ? (
          <Link to="/auth/signin" className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}>
            Signin
          </Link>
        ) : (
          <Link to="/auth/signup" className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}>
            Signup
          </Link>
        )}
        <aside className="auth__aside">
          <div className="layout" />

          <div className="top">
            The
            <DiVim size={40} />
            agen
          </div>

          <div className="quote">
            <blockquote>
              <p>
                &ldquo;Don't be fooled by the calendar. There are only as many days in the year as you make use of. One
                man gets only a week's value out of a year while another man gets a full year's value out of a
                week.&rdquo;
              </p>
              <footer>
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEVq6auQMUjGA/profile-displayphoto-shrink_800_800/0/1610015961660?e=2147483647&v=beta&t=rmpXaqvBRpeK-TTsRFhbuhF-PyTwlmwW31YNwSbnMBY"
                  width={40}
                  className="rounded-full"
                  alt=""
                />
                Sofia Davis
              </footer>
            </blockquote>
          </div>
        </aside>
        <div className="auth__Sign-form">
          {type !== 'signin' ? (
            <div>
              <div>
                <h1>Create an account</h1>
                <p>Enter your email below to create your account</p>
              </div>
              <Signup />
              <p>
                By clicking continue, you agree to our <Link to="/terms">Terms of Service</Link> and
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          ) : (
            <div>
              <div>
                <h1>Welcome back</h1>
                <p>Enter your data below to signin your account</p>
              </div>
              <p>
                By clicking continue, you agree to our <Link to="/terms">Terms of Service</Link> and
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          )}
        </div>
      </div><Outlet />
    </>
  )
}

// <Login />
