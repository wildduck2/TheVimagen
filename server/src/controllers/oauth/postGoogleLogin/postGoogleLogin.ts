import { RequestHandler } from 'express'
import { User } from 'services'
import { prisma } from 'utils'

export const postGoogleLogin: RequestHandler = async (req, res) => {
    const code = req.query.code as string
    try {
        //NOTE: get the id access token with the code
        const { id_token, access_token } = await User.getGoogleOAuthToken({ code })
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
        const user = await User.upsertUserOauthData({
            email,
            picture,
            verified_email,
            first_name: given_name,
            last_name: family_name
        })
        if (!user) {
            return res.json({ error: `Error: user data has not updated` })
        }

        //NOTE: create a sesssion for the user
        const session = await User.find_sesssion_if_not_create_one({
            user_id: user.id,
            session: req.session,
            expires_at: req.session.cookie.expires!,
            session_id: req.session.id
        })

        console.log(session, 'session')
        if (!session) {
            return res.send({
                error: `Error: session has not created or updated`,
                user
            })
        }

        //NOTE: set cookie for the user
        req.session.user = user
        console.log(req.session.cookie)

        //NOTE: redirect back to the client
        res.json({ error: null, body: userData })
        // res.redirect('http://localhost:5173/email/inbox')
    } catch (error) {
        return res.json({ error: 'oauth with google has failed, please try again' })
    }
}
