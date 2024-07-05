import { RequestHandler } from 'express'
import { User } from '../../../services'
import { postSignoutHandlerType } from './postSignoutHandler.types'

export const postSignoutHandler: RequestHandler = async (req, res) => {
  const { user_id }: postSignoutHandlerType = req.body

  try {
    const signedOut = await User.deleteSession({ user_id })
    if (signedOut) {
      return res.json({ error: null, signedOut: true })
    } else {
      return res.json({ error: 'session delete failed', signedOut: false })
    }
  } catch (error) {
    return res.json({ error: 'signout filed with errors', signedOut: false })
  }
}
