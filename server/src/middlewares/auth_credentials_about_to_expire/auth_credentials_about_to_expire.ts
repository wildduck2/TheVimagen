import { RequestHandler } from 'express'
import { User } from '../../services'
import { get_new_access_token } from '../../utils'
import { AuthCredentialsAboutToExpireType } from './auth_credentials_about_to_expire.types'

export const auth_credentials_about_to_expire: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user_id = req.session.oauth_user_data?.user_id as string

    //NOTE: get oauth data from db
    const oauth_user_data = await User.get_oauth_data({
      user_id: '4e57c982-c938-4a76-a9ff-d5af5a51ab54'
    })
    if (!oauth_user_data)
      return res.json({ error: `Error: user does not exist`, data: null })

    //NOTE: assign the data to the req
    req.session.oauth_user_data = oauth_user_data

    //NOTE: checking for the expiration of the credentials
    const EXPIRATION_THRESHOLD = 5 * 60 * 1000
    const { updated_at, expire_in } = oauth_user_data
    const currentTime = Date.now()
    const timeElapsed = currentTime - updated_at.getTime()
    const timeRemaining = expire_in * 1000 - timeElapsed

    if (timeRemaining >= EXPIRATION_THRESHOLD) return next()

    //NOTE: refresh the token if it's about to expire
    const access_data = await get_new_access_token({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      refreshToken: oauth_user_data.refresh_token as string
    })
    if (!access_data)
      return res.json({
        error: `Error: oauth refresh token failed`,
        data: null
      })

    //NOTE: update oauth usre data
    const oauth_data_updated = await User.upsert_oauth_data({
      user_id: oauth_user_data.user_id,
      oauth_id: oauth_user_data.oauth_id,
      refresh_token: oauth_user_data.refresh_token as string,
      expire_in: access_data.expires_in,
      id_token: access_data.id_token as string,
      access_token: access_data.access_token
    })
    if (!oauth_data_updated)
      return res.json({
        error: `Error: failed to update the oauth user data`,
        data: null
      })

    //NOTE: assign the oauth data to the session
    req.session.oauth_user_data = oauth_data_updated
    return next()
  } catch (error) {
    return res.json({ error: 'failed to request neew tokens' })
  }
}
