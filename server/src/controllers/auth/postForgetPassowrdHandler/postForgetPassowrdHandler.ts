import { RequestHandler } from 'express'
import { User } from '../../../modles'
import { postForgetPassowrdHandlerBodyProps } from './postForgetPassowrdHandler.types'

export const postForgetPassowrdHandler: RequestHandler = async (req, res) => {
  const { email }: postForgetPassowrdHandlerBodyProps = req.body

  try {
    const user = await User.checkUserExistInDb({
      validEmail: email
    })

    if (!user) return res.json({ error: 'The user does not exist', user: null })

    const { otp } = await User.generateOTP({ userId: user.id })

    //NOTE: Rendering the Coponent and send the Email
    await User.sendEmail({
      otp,
      title: 'Reset your account password at TheVimeagen',
      email,
      cb: (error, info) => {
        if (error) {
          return res.status(500).send(error.toString())
        }
        res.send('Email sent: ' + info.response)
        return res.send('email sent okay')
      }
    })

    return res.json({ error: null, user: user })
  } catch (error) {
    return res.json({ error: 'The user does not exist', email })
  }
}
