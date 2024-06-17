import { RequestHandler } from "express"
import { verifyOTP } from "../../../utils"

export const postSignupAuthStep2Handler: RequestHandler = async (req, res) => {

    try {
        const { otp, userId } = req.body
        console.log(otp, userId)

        const res = await verifyOTP(userId, otp)
        console.log(res)

    } catch (error) {
        console.log(error)
        return res.json({ error: error })
    }

    return res.json({ verified: true })
}
