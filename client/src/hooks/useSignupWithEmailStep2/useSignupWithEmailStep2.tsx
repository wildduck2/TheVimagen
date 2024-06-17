import { RootState } from "@/context"
import { zodCreditValidation } from "@/utils"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { z } from "zod"

export type useSignupIWthEmailStep2Props = {
    otp: string
}
export const useSignupIWthEmailStep2 = ({ otp }: useSignupIWthEmailStep2Props) => {
    const [open, setOpen] = useState(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const user = useSelector((state: RootState) => state.user.user)

    const formSubmitionInvoke = async () => {
        setIsLoading(true)
        try {

            //NOTE: Making the req to the server with the credentials 
            const { data, statusText } = await axios.post(`${process.env.ROOT_URL}/auth/signup-email-step2`, {
                otp,
                userId: user?.id
            })

            if (!data && statusText === "OK") {
                toast.error(`failed to verify your Account wrong OTP`)
            }

            setOpen(false)
            setIsLoading(false)
            console.log(data)

        } catch (error) {
            toast.error(`couldn't verify the OTP code try again!`)
            console.log(error)
        }
    }

    return { open, isLoading, formSubmitionInvoke } as const
}
