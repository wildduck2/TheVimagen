import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../../services'
import { prisma } from '../../../utils'
import { postSigninAuthHandlerBodyProps } from './postSigninAuthHandler.types'

export const postSigninAuthHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password }: postSigninAuthHandlerBodyProps = req.body

    // //NOTE: Checking for the user exist in the DB
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.json({ user: null, error: 'User does not exist' })
    }

    //NOTE: comparing passwords
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: 'Unvalid Credintial password!', user: null })
    }

    //NOTE: checking for any session realated to this user and it's valid not expired
    const session = await User.find_sesssion_if_not_create_one({
      user_id: user.id,
      session: req.session,
      expires_at: req.session.cookie.expires!,
      session_id: req.sessionID
    })
    if (!session) return res.json({ error: 'session has not created', user })

    req.session.user = user
    return res.json({ user, error: null })
  } catch (error) {
    return res.json({
      error: 'sign in failed some Credintials are invalid',
      user: null
    })
  }
}
