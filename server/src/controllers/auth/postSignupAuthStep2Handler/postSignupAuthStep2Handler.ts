import { RequestHandler } from 'express'
import { User } from '../../../services'
import { postSignupAuthStep2HandlerBodyProps } from './postSignupAuthStep2Handler.types'

export const postSignupAuthStep2Handler: RequestHandler = async (req, res) => {
  try {
    const { otp, user_id }: postSignupAuthStep2HandlerBodyProps = req.body

    //NOTE: checking for the OTP in the DB
    const OTP = await User.verifyOTP({ user_id, otp })
    if (!OTP) return res.json({ error: 'Wrong OTP code try again', otp: null })

    return res.json({ verified: true })
  } catch (error) {
    console.log(error)
    return res.json({ error: error })
  }
}
