import {
  Button,
  CommandWrapper,
  Input,
  InputWrapper,
  SelectedWrapper,
  TextAreaWrapper,
  Textarea,
} from '@/components/ui'
import { SignupEmailSetup3Type } from './SignupEmailSetup3.types'
import { Icons, companyProfessions } from '@/constants'
import { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { useSignupIWthEmailStep3 } from '@/hooks'

export const SignupEmailSetup3 = ({ hi }: SignupEmailSetup3Type) => {
  const [lastName, setLastName] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [pronounce, setPronounce] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [profession, setProfession] = useState<string>('')
  const [yearsOfExprience, setYearsOfExprience] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  const { isLoading, formSubmitionInvoke, error } = useSignupIWthEmailStep3({
    firstName,
    lastName,
    profession,
    pronounce,
    yearsOfExprience,
    bio,
    age,
  })
  return (
    <>
      <div className="signup__step">
        <div className="signup__step__3">
          <div className="signup__step__3__header">
            <div className="signup__step__3__header__title">Complete Your Quest: Finalize Your Account Creation</div>
          </div>

          <div className="signup__step__3__content">
            <form className="signup__step__3__content__form" onSubmit={formSubmitionInvoke}>
              <div className="signup__step__3__content__form__row1">
                <InputWrapper setValue={setFirstName} value={firstName} label="First Name" error={error?.firstName} />
                <InputWrapper setValue={setLastName} value={lastName} label="Last Name" error={error?.lastName} />
                <InputWrapper setValue={setPronounce} value={pronounce} label="Pronounce" error={error?.pronounce} />
              </div>
              <div className="signup__step__3__content__form__row2">
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
                  error={error?.yearsOfExprience}
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
              <div className="signup__step__3__content__form__row1">
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
