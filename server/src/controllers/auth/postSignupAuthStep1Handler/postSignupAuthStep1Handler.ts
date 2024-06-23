import { RequestHandler } from 'express'
import { z } from 'zod'
import { User } from '../../../modles'
import { Prisma } from '@prisma/client'
import { postSignupAuthStep1HandlerBodyProps } from './postSignupAuthStep1Handler.types'

export const postSignupAuthStep1Handler: RequestHandler = async (req, res) => {
  try {
    const { password, email, userName }: postSignupAuthStep1HandlerBodyProps =
      req.body

    //NOTE: checking for the user existence in out DB
    const userDoExist = await User.checkUserExistInDb({
      email,
      userName
    })
    if (userDoExist)
      return res.json({
        error: 'User creation failed with error!! try again!',
        user: userDoExist
      })

    // NOTE: create new user
    const user = await User.createNewUser({
      email,
      userName,
      password,
      sessionId: req.session.id,
      expiresAt: req.session.cookie.expires!,
      session: req.session
    })
    if (!user) return res.json({ error: "user hasn't created", user: null })

    //NOTE: genrating the OTP and create DB field with it
    const { otp } = await User.generateOTP({ userId: user.id })
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
