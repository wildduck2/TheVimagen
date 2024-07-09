import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'
import { PostThreadReplyType } from './postThreadReply.types'

export const postThreadReply: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const { threadId, to, subject, inReplyTo, body }: PostThreadReplyType =
    req.body
  try {
    const data = await Email.threadReply({
      access_token,
      distnation: `${oauth_id}/messages/send/`,
      threadId,
      to,
      subject,
      inReplyTo,
      body
    })

    if (!data)
      return res.json({ error: 'failed to send the message', data: null })
    return res.json({ error: null, data: data })
  } catch (error) {
    return res.json({ error: 'failed to send the message', data: null })
  }
}
