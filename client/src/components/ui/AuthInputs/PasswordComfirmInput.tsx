import { useRef, useState } from "react"
import { Input } from "../Input"
import { Label } from "../Label"
import { BsPatchExclamation } from "react-icons/bs"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"


export type PasowordComirmInputProps = { isLoading: boolean }


export const PasowordComirmInput = ({ isLoading }: PasswordComfirmInputProps) => {
    const utils = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch()

    const [passwordcomfirmValid, setPasswordcomfirmValid] = useState<boolean>(false)
    const [passwordcomfirm, setPasswordcomfirm] = useState<string>('')
    const [passwordcomfirmShow, setPasswordcomfirmationShow] = useState<boolean>(false)

    const passwordcomfirmRef = useRef<HTMLInputElement>(null)
    return (<>

        <div>
            <Label htmlFor="password">Password Comfirmation</Label>
            <Input
                id="password"
                className={`${passwordcomfirmValid && 'input-notvalid'}`}
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                required
                value={passwordcomfirm}
                onChange={({ currentTarget }) => {

                    setPasswordcomfirm(currentTarget.value)
                    // onChangeInput({
                    //     e,
                    //     password,
                    //     passwordconf: passwordcomfirmation,
                    //     setFunc: setPasswordcomfirmation,
                    //     setvalid: "rules": {
                    "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off"
  }setPasswordcomfirmationValid,
                    //     setvalidcomf: setPasswordValid,
                    //     type: 'passwordcomfirmation',
                    //     utils,
                    //     dispatch,
                    // })
                }}
            disabled={isLoading}
            ref={passwordcomfirmRef}
            />
            <div>
                {passwordcomfirmValid && <BsPatchExclamation className="text-red-700" />}
                <button
                    type="button"
                    onClick={() =>
                        onPasswordShow({
                            setFunc: setPasswordcomfirmationShow,
                            passwordRef: passwordcomfirmRef,
                            passwordShow: passwordcomfirmShow,
                        })
                    }
                >
                    {!passwordcomfirmShow ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
            </div>
        </div>



    </>)
}
