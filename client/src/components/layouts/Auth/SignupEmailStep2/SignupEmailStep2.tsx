import { emailIllustrate } from "@/assets"
import {
    Button, Dialog, DialogContentNoCloseButton, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui"
import { useState } from "react"

export const SignupEmailState = () => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <Dialog open={open}>
                <DialogContentNoCloseButton className="md:max-w-[625px] sm:max-w-[450px] md:py-[4rem] md:px-[7rem]">
                    <DialogHeader className="grid place-items-center gap-3">
                        <img src={emailIllustrate} width={150} />
                        <DialogTitle className="text-center">Check your email</DialogTitle>
                        <DialogDescription className="max-w-[90%] text-center">
                            Enter The 6-digit code sent to {localStorage.getItem("email") ?? "your email"} to continue.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-7 py-4 place-items-center">

                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                    </div>
                    <DialogFooter className="place-self-center" >
                        <Button onClick={() => setOpen(false)} type="submit">Confirm your Email</Button>
                    </DialogFooter>
                </DialogContentNoCloseButton>
            </Dialog ></>
    )
}
