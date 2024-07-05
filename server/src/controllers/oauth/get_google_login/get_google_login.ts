import { RequestHandler } from 'express'
import { getGoogleOAuthURL } from '../../../utils'

export const get_google_login: RequestHandler = (req, res) => {
  //NOTE: gen GOOGLE OAUTH URL
  const url = getGoogleOAuthURL()

  res.json({ url: url })
}
