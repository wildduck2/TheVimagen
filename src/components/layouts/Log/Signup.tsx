import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../context/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeInput, onPasswordShow } from '../../../utils';

import { Label } from '@radix-ui/react-label';
import { Button, Input } from '../../ui';
import { Icons } from './Icons';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { BsPatchExclamation } from 'react-icons/bs';
import { GiPlainCircle } from 'react-icons/gi';
import { passwordrules } from '../../../constants';
import { UserAuthFormProps } from './Log.types';
import { useSigninwithGithub, useSignupWithEmail } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

const Signup = ({ ...props }: UserAuthFormProps) => {
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

    const [passwordcomfirmationValid, setPasswordcomfirmationValid] = useState<boolean>(false);
    const [passwordcomfirmation, setPasswordcomfirmation] = useState<string>('');
    const [passwordcomfirmationShow, setPasswordcomfirmationShow] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordcomfirmationRef = useRef<HTMLInputElement>(null);

    const { creditValidEmail, authEmail } = useSignupWithEmail({
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

    console.log((utils.inputsValid.email === true && utils.inputsValid.password === true && utils.inputsValid.passwordcomfirmation === true));

    console.log(passwordValid
        , passwordcomfirmationValid);


    console.log("email", utils.inputsValid.email);
    console.log("pass", utils.inputsValid.password);
    console.log("conf", utils.inputsValid.passwordcomfirmation);



    useEffect(() => {
        setNotValid(utils.inputsValid.email && utils.inputsValid.password && utils.inputsValid.passwordcomfirmation ? true : false);
    }, [dispatch, emailValid, passwordValid, passwordShowMenu, passwordcomfirmationShow, passwordcomfirmationValid, creditValidEmail, creditValidGithub]);

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
                    <p className={!emailValid ? 'hide' : 'active'}>Email is not valid</p>
                    <div>
                        <Label htmlFor="password">Password</Label>
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
                                    passwordconf: passwordcomfirmation,
                                    setvalidcomf: setPasswordcomfirmationValid,
                                    setPasswordShowMenu,
                                    type: 'password',
                                    utils,
                                    dispatch,
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
                    <p className={!passwordValid ? 'hide' : 'active'}> Password is not valid</p>
                    <div className={`password-rules ${passwordShowMenu ? 'active' : 'hide'} `}>
                        <ul>
                            {passwordrules.map((rule) => (
                                <li key={rule.id}>
                                    <GiPlainCircle
                                        className={`${passwordValid && 'red'}  
                                             ${utils.passwordHasUppercase && rule.id === 1 && 'green'}
                                             ${utils.passwordHasLowercase && rule.id === 2 && 'green'}
                                             ${utils.passwordHasNumber && rule.id === 3 && 'green'}
                                             ${utils.passwordHasSpecialCharacter && rule.id === 4 && 'green'}
                                             ${utils.passwordInRange && rule.id === 5 && 'green'}
                                        `}
                                    />
                                    <span>{rule.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Label htmlFor="password">Password Comfirmation</Label>
                        <Input
                            id="password"
                            className={`${passwordcomfirmationValid && 'input-notvalid'}`}
                            placeholder="••••••••"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            required
                            value={passwordcomfirmation}
                            onChange={(e) => {
                                onChangeInput({
                                    e,
                                    password,
                                    passwordconf: passwordcomfirmation,
                                    setFunc: setPasswordcomfirmation,
                                    setvalid: setPasswordcomfirmationValid,
                                    setvalidcomf: setPasswordValid,
                                    type: 'passwordcomfirmation',
                                    utils,
                                    dispatch,
                                });
                            }}
                            disabled={isLoading}
                            ref={passwordcomfirmationRef}
                        />
                        <div>
                            {passwordcomfirmationValid && <BsPatchExclamation className="text-red-700" />}
                            <button
                                type="button"
                                onClick={() => onPasswordShow({ setFunc: setPasswordcomfirmationShow, passwordRef: passwordcomfirmationRef, passwordShow: passwordcomfirmationShow })}
                            >
                                {!passwordcomfirmationShow ? <RiEyeLine /> : <RiEyeOffLine />}
                            </button>
                        </div>
                    </div>


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
            <Button variant="outline" type="button" disabled={isLoading} onClick={authGithub}>
                {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.gitHub />} Github
            </Button>
        </div>
    );
};

export default Signup;
