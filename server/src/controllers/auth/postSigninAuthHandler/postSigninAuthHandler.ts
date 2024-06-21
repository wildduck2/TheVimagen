import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { User } from '../../../modles'
import { prisma } from '../../../utils'
import { postSigninAuthHandlerBodyProps } from './postSigninAuthHandler.types'

export const postSigninAuthHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password }: postSigninAuthHandlerBodyProps = req.body

    //NOTE: Checking for the user exist in the DB
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.json({ user: null, error: 'User does not exist' })
    }

    //NOTE: comparing passwords
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: 'Unvalid Credintial (email 0r password)!', user: null })
    }

    //NOTE: checking for any session realated to this user and it's valid not expired
    User.findSesssionIfNotCreateOne({
      userId: user.id,
      session: req.session,
      expiresAt: req.session.cookie.expires!,
      sessionId: req.sessionID
    })

    req.session.user = user
    return res.json({ user: user, error: null })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(401)
        .json({ error: 'Unvalid Credintial (email 0r password)!', user: null })
    }
    console.log(error)
    return res.json({ error: error, user: null })
  }
}
