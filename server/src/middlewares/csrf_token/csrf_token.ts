import { RequestHandler } from 'express'
import { generateToken } from '../../utils'

export const csrf_token: RequestHandler = (req, res) => {
  const csrf_token = generateToken(req, res)
  res.json({ csrf_token })
}
