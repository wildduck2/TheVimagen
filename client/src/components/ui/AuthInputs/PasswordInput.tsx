import { useRef, useState } from "react"
import { Input } from "../Input"
import { Label } from "../Label"
import { passwordrules } from "@/constants"
import { GiPlainCircle } from "react-icons/gi"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { BsPatchExclamation } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"

type PasswordInputProps = { isLoading: boolean }


export const PasswordInput = ({ isLoading }: PasswordInputProps) => {
    const utils = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch()

    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [passwordShowMenu, setPasswordShowMenu] = useState<boolean>(false)

    const passwordRef = useRef<HTMLInputElement>(null)

    return (<>


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
                onChange={({ currentTarget }) => {
                    setPassword(currentTarget.value)
                    // onChangeInput({
                    //     e,
                    //     setFunc: setPassword,
                    //     setvalid: setPasswordValid,
                    //     password: password,
                    //     passwordconf: passwordcomfirmation,
                    //     setvalidcomf: setPasswordcomfirmationValid,
                    //     setPasswordShowMenu,
                    //     type: 'password',
                    //     utils,
                    //     dispatch,
                    // })
                }}
                disabled={isLoading}
                ref={passwordRef}
                onFocus={() => {
                    setPasswordShowMenu(true)
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

    </>)
}
