import { Button, CommandWrapper, InputWrapper, SelectedWrapper, TextAreaWrapper, buttonVariants } from '@/components/ui'
import { Icons, companyProfessions } from '@/constants'
import { useState } from 'react'
import { useSignupIWthEmailStep3 } from '@/hooks'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

export const CompleteAccountInformation = () => {
  const [last_name, setLastName] = useState<string>('')
  const [first_name, setFirstName] = useState<string>('')
  const [pronounce, setPronounce] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [profession, setProfession] = useState<string>('')
  const [years_of_exprience, setYearsOfExprience] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  const { isLoading, formSubmitionInvoke, error } = useSignupIWthEmailStep3({
    first_name,
    last_name,
    profession,
    pronounce,
    years_of_exprience,
    bio,
    age,
  })
  return (
    <>
      <div className="signup__step">
        <Link to="/auth/signup" className={cn(buttonVariants({ variant: 'ghost' }), 'auth__link')}>
          Sign out
        </Link>
        <div className="complete__account__information">
          <div className="complete__account__information__header">
            <div className="complete__account__information__header__title">
              Complete Your Quest: Finalize Your Account Creation
            </div>
          </div>

          <div className="complete__account__information__content">
            <form className="complete__account__information__content__form" onSubmit={formSubmitionInvoke}>
              <div className="complete__account__information__content__form__row1">
                <InputWrapper setValue={setFirstName} value={first_name} label="First Name" error={error?.first_name} />
                <InputWrapper setValue={setLastName} value={last_name} label="Last Name" error={error?.last_name} />
                <InputWrapper setValue={setPronounce} value={pronounce} label="Pronounce" error={error?.pronounce} />
              </div>
              <div className="complete__account__information__content__form__row2">
                <SelectedWrapper
                  id="age"
                  htmlFor="age"
                  title="Age"
                  setValue={setAge}
                  slectedValuePLaceHolder={'Select your Age'}
                  disabled={isLoading}
                  data={Array.from({ length: 100 - 18 + 1 }, (_, index) => (18 + index).toString())}
                  className=""
                  error={error?.age}
                />
                <SelectedWrapper
                  id="yearsOfExprience"
                  htmlFor="yearsOfExprience"
                  title="Years Of exprience"
                  setValue={setYearsOfExprience}
                  slectedValuePLaceHolder={'Select Years of Exp'}
                  disabled={isLoading}
                  data={Array.from({ length: 50 - 0 + 1 }, (_, index) => (0 + index).toString())}
                  className=""
                  error={error?.years_of_exprience}
                />
                <CommandWrapper
                  title="Profession"
                  setValue={setProfession}
                  disabled={isLoading}
                  data={companyProfessions}
                  value={profession}
                  className=""
                  error={error?.profession}
                />
              </div>
              <div className="complete__account__information__content__form__row1">
                <TextAreaWrapper value={bio} setValue={setBio} label="Type your Bio" error={error?.bio} />
              </div>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Icons.spinner className="spin" />}
                Complete the setup
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
