import { RequestHandler } from 'express'
import { User } from 'services'
import { postSignoutHandlerType } from './postSignoutHandler.types'

export const postSignoutHandler: RequestHandler = async (req, res) => {
  const { user_id }: postSignoutHandlerType = req.body
  try {
    async function cb() {
      //NOTE: Checking for the session in the db and delete it
      const session = await User.deleteSession({ user_id })
      if (!session) return res.json({ error: null, signedOut: true })

      return res.json({ error: null, signedOut: true })
    }
    req.session.destroy(cb)
  } catch (error) {
    res.json({ error: 'signout filed with errors', signedOut: false })
  }
}
