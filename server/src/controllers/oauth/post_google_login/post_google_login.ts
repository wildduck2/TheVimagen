import { RequestHandler } from 'express'
import { User } from 'services'

export const post_google_login: RequestHandler = async (req, res) => {
  const code = req.query.code as string

  try {
    //NOTE: get the id access token with the code
    const { id_token, access_token, refresh_token, expires_in } =
      await User.getGoogleOAuthToken({ code })

    if (!id_token || !access_token)
      return res.json({
        error: `Error: user has not authed by google`,
        user: null
      })

    //NOTE: get the user with token
    const userData = await User.getGoogleUserInfo({
      id_token,
      access_token
    })
    const { email, picture, verified_email, given_name, family_name, id } =
      userData
    if (!userData)
      return res.json({
        error: `Error: getin' the user data from google has filed`,
        user: null
      })

    //NOTE: upsert the user
    const user = await User.upsert_user_oauth_data({
      email,
      picture,
      verified_email,
      first_name: given_name,
      last_name: family_name
    })
    if (!user) {
      return res.json({ error: `Error: user data has not updated` })
    }

    //NOTE: upsert the oauth data in the db
    const oauth_data = User.upsert_oauth_data({
      oauth_id: id,
      refresh_token,
      access_token,
      expire_in: expires_in,
      id_token,
      user_id: user?.id
    })
    console.log(oauth_data)

    if (!oauth_data) {
      return res.json({ error: `Error: oauth data has not updated` })
    }

    //NOTE: create a sesssion for the user
    const session = await User.find_sesssion_if_not_create_one({
      user_id: user.id,
      session: req.session,
      expires_at: req.session.cookie.expires!,
      session_id: req.session.id
    })
    if (!session) {
      return res.send({
        error: `Error: session has not created or updated`,
        user
      })
    }

    //NOTE: set cookie for the user
    req.session.user = user

    //NOTE: redirect back to the client
    res.json({ error: null, body: userData })
    // res.redirect('http://localhost:5173/email/inbox')
  } catch (error) {
    console.log(error)
    return res.json({ error: 'oauth with google has failed, please try again' })
  }
}
