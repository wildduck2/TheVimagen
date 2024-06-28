import { RequestHandler } from 'express'
import { getGoogleOAuthURL } from 'utils'

export const getGoogleLogin: RequestHandler = async (req, res) => {
  //NOTE: gen GOOGLE OAUTH URL
  const url = getGoogleOAuthURL()

  res.json({ url })
}
