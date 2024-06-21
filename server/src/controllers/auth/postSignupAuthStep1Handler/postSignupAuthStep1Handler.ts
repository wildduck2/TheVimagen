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
        error: 'User creation failed with error!! try again!'
      })

    const user = await User.createNewUser({
      email,
      userName,
      password,
      sessionId: req.session.id,
      expiresAt: req.session.cookie.expires!,
      session: req.session
    })

    //NOTE: Hash the password before saving it to the database
    if (!user) return res.json({ error: "user hasn't created", user })

    //NOTE: genrating the OTP and create DB field with it
    const { otp } = await User.generateOTP({ userId: user.id })

    req.session.user = user

    //NOTE: Rendering the Coponent and send the Email
    // await User.sendEmail({
    //     otp,
    //     title: 'Verify your account at TheVimeagen',
    //     email,
    //     cb: (error, info) => {
    //         if (error) {
    //             return res.status(500).send(error.toString());
    //         }
    //         res.send('Email sent: ' + info.response);
    //         return res.send('email sent okay');
    //     },
    // });

    return res.json({ user, error: null, otp })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(401).json({
        error: 'User creation failed with error!! try again!',
        user: null
      })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.json({
          error: 'User creation failed with error!! try again!',
          user: null
        })
      }
    }
    return res.json({ error: error })
  }
}
