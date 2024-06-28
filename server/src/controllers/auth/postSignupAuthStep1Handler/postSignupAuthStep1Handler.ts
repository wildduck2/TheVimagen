import { RequestHandler } from 'express'
import { User } from '../../../services'
import { Prisma } from '@prisma/client'
import { postSignupAuthStep1HandlerBodyProps } from './postSignupAuthStep1Handler.types'

export const postSignupAuthStep1Handler: RequestHandler = async (req, res) => {
  try {
    const { password, email, user_name }: postSignupAuthStep1HandlerBodyProps =
      req.body

    //NOTE: checking for the user existence in out DB
    const userDoExist = await User.checkUserExistInDb({ email })
    if (userDoExist)
      return res.json({
        error: 'User creation failed with error!! try again!',
        user: userDoExist
      })

    // NOTE: create new user
    const user = await User.createNewUser({
      email,
      user_name,
      password,
      session_id: req.session.id,
      expires_at: req.session.cookie.expires!,
      session: req.session
    })
    if (!user) return res.json({ error: "user hasn't created", user: null })

    //NOTE: genrating the OTP and create DB field with it
    const { otp } = await User.generateOTP({ user_id: user.id })
    if (!otp) {
      return res.json({ error: 'otp has not created', user: null })
    }

    req.session.user = user

    //NOTE: Rendering the Coponent and send the Email
    await User.sendEmail({
      otp,
      title: 'Verify your account at TheVimeagen',
      email,
      cb: (error, info) => {
        if (error) {
          res.status(500).json({ user, error: error.message })
          return res.json({ user, error: null })
        }
        //   res.status(500).json({ user, error: null, email: info.response })
        return res.status(200).json({ user, error: null, email: info.response })
      }
    })
    return res.status(200).json({ user, error: null })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.json({
          error: error,
          user: null
        })
      }
    }
    // return res.json({ error: 'signup failed with error', user: null })
  }
}
