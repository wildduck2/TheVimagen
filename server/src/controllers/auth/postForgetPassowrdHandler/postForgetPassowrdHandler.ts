import { RequestHandler } from 'express'
import { User } from '../../../services'
import { postForgetPassowrdHandlerBodyProps } from './postForgetPassowrdHandler.types'

export const postForgetPassowrdHandler: RequestHandler = async (req, res) => {
  const { email }: postForgetPassowrdHandlerBodyProps = req.body

  try {
    // NOTE: Chekcing if the user do exist in the DB
    const user = await User.checkUserExistInDb({
      email
    })
    if (!user) return res.json({ error: 'The user does not exist', user: null })

    // NOTE: Generateing OTP for the user
    const { otp } = await User.generateOTP({ user_id: user.id })
    if (!otp) return res.json({ error: 'The user does not exist', user: null })

    // NOTE: Rendering the Coponent and send the Email
    await User.sendEmail({
      otp,
      title: 'Reset your account password at TheVimeagen',
      email,
      cb: (error) => {
        if (error) return res.status(400)
        return res.status(200)
      }
    })

    return res.json({ error: null, user })
  } catch (error) {
    return res.json({ error: 'The user does not exist', user: null })
  }
}
