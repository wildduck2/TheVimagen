import { RequestHandler } from 'express'

export const session_verify: RequestHandler = (req, res, next) => {
  if (!req.sessionID) {
    return res.json({ error: "you're not signed in" })
  }

  return next()
}
