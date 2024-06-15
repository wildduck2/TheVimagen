import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { EmailInput, Button, PasowordComirmInput } from "@/components/ui"
import { Icons } from "@/constants"
import { RootState } from "@/context"
import { UserAuthFormProps } from "../Log"


const Signup = ({ ...props }: UserAuthFormProps) => {
    const route = useNavigate()
    const inputsValid = useSelector((state: RootState) => state.utils.inputsValid)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [notValid, setNotValid] = useState<boolean>(false)



    // const { creditValidEmail, authEmail } = useSignupWithEmail({
    //   email,
    //   password,
    //   dispatch,
    //   setIsLoading,
    //   setEmailValid,
    //   setPasswordValid,
    //   route,
    // })

    useEffect(() => {
        setNotValid(
            inputsValid.email && inputsValid.password && inputsValid.passwordComfirm ? true : false,
        )
    }, [dispatch, inputsValid])
    console.log(notValid, inputsValid, inputsValid.email && inputsValid.password && inputsValid.passwordComfirm)

    return (
        <div className="signup" {...props}>
            <form onSubmit={() => { }}>
                <div>
                    <EmailInput isLoading={isLoading} />
                    <PasowordComirmInput isLoading={isLoading} />

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
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => { }}>
                {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.gitHub />} Github
            </Button>
        </div>
    )
}

export default Signup
