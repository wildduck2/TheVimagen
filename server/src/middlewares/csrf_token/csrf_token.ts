import { RequestHandler } from 'express'
import { generateToken } from '../../utils'

export const csrf_token: RequestHandler = (req, res, next) => {
  // const csrf_token = generateToken(req, res)
  // res.json({ csrf_token })
  next()
}
