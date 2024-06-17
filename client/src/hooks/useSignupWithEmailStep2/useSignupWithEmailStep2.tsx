import { RootState } from "@/context"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "sonner"

export type useSignupIWthEmailStep2Props = {
    otp: string
}
export const useSignupIWthEmailStep2 = ({ otp }: useSignupIWthEmailStep2Props) => {
    const [open, setOpen] = useState(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const user = useSelector((state: RootState) => state.user.user)

    const formSubmitionInvoke = async () => {
        try {
            setIsLoading(true)

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
