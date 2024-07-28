import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'

export const getLabels: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  try {
    const data = await Email.getLabels({ access_token })

    if (!data) return res.json({ error: 'failed to fetch labels', data: null })
    return res.json({ error: null, data })
  } catch (error) {
    return res.json({ error: 'failed to fetch labels', data: null })
  }
}
