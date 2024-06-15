import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../context/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeInput, onPasswordShow } from '../../../utils';
import { useSigninWithEmail, useSigninwithGithub } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

import { Label } from '@radix-ui/react-label';
import { Button, Input } from '../../ui';
import { Icons } from './Icons';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { BsPatchExclamation } from 'react-icons/bs';
import { GiPlainCircle } from 'react-icons/gi';
import { passwordrules } from '../../../constants';
import { UserAuthFormProps } from './Log.types';

const Signin = ({ ...props }: UserAuthFormProps) => {
  const route = useNavigate();

  const utils = useSelector((state: RootState) => state.utils);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notValid, setNotValid] = useState<boolean>(false);

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordShowMenu, setPasswordShowMenu] = useState<boolean>(false);

  const [passwordHasLowercase, setPasswordHasLowercase] = useState<boolean>(false);
  const [passwordHasUppercase, setPasswordHasUppercase] = useState<boolean>(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState<boolean>(false);
  const [passwordHasSpecialCharacter, setPasswordHasSpecialCharacter] = useState<boolean>(false);
  const [passwordInRange, setPasswordInRange] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { creditValidEmail, authEmail } = useSigninWithEmail({
    email,
    password,
    dispatch,
    setIsLoading,
    setEmailValid,
    setPasswordValid,
    route,
  });

  const { creditValidGithub, authGithub } = useSigninwithGithub({
    dispatch,
    setIsLoading,
    setEmailValid,
    setPasswordValid,
    route,
  });

  useEffect(() => {
    setNotValid(utils.inputsValid.email && utils.inputsValid.password ? true : false);
  }, [dispatch, emailValid, passwordValid, passwordShowMenu, creditValidEmail, creditValidGithub, utils]);

  console.log(creditValidEmail, creditValidGithub);

  return (
    <div className="signup" {...props}>
      <form onSubmit={authEmail}>
        <div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className={`${emailValid && 'input-notvalid'}`}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              disabled={isLoading}
              onChange={(e) => {
                onChangeInput({
                  e,
                  setFunc: setEmail,
                  setvalid: setEmailValid,
                  type: 'email',
                  utils,
                  dispatch,
                });
              }}
              required
              ref={emailRef}
            />
            <div>{emailValid && <BsPatchExclamation className="h-4 w-4 text-red-700" />}</div>
          </div>
          <p className={!emailValid ? 'hide' : 'active'}>Email address not recognized, invalid.</p>
          <div>
            <Label htmlFor="password">Email</Label>
            <Input
              id="password"
              className={`${passwordValid && 'input-notvalid'}`}
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              required
              value={password}
              onChange={(e) => {
                onChangeInput({
                  e,
                  setFunc: setPassword,
                  setvalid: setPasswordValid,
                  password: password,
                  setPasswordShowMenu,
                  type: 'password',
                  utils,
                  dispatch,
                  setPasswordHasLowercase,
                  setPasswordHasUppercase,
                  setPasswordHasNumber,
                  setPasswordHasSpecialCharacter,
                  setPasswordInRange,
                });
              }}
              disabled={isLoading}
              ref={passwordRef}
              onFocus={() => {
                setPasswordShowMenu(true);
              }}
            />
            <div>
              {passwordValid && <BsPatchExclamation className="text-red-700" />}
              <button
                type="button"
                onClick={() => onPasswordShow({ setFunc: setPasswordShow, passwordRef, passwordShow })}
              >
                {passwordShow ? <RiEyeLine /> : <RiEyeOffLine />}
              </button>
            </div>
          </div>
          <p className={!passwordValid ? 'hide' : 'active'}> Invalid password, access denied.</p>
          <div className={`password-rules ${passwordShowMenu ? 'active' : 'hide'} `}>
            <ul>
              {passwordrules.map((rule) => (
                <li key={rule.id}>
                  <GiPlainCircle
                    className={`${passwordValid && 'red'}  
                     ${passwordHasLowercase && rule.id === 1 && 'green'}
                     ${passwordHasUppercase && rule.id === 2 && 'green'}
                     ${passwordHasNumber && rule.id === 3 && 'green'}
                     ${passwordHasSpecialCharacter && rule.id === 4 && 'green'}
                     ${passwordInRange && rule.id === 5 && 'green'}
                     `}
                  />
                  <span>{rule.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button disabled={isLoading || !notValid}>
            {isLoading && <Icons.spinner />}
            Sign In with Email
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
      <Button variant="outline" type="button" disabled={isLoading} onClick={authGithub}>
        {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.gitHub />} Github
      </Button>
    </div>
  );
};

export default Signin;
