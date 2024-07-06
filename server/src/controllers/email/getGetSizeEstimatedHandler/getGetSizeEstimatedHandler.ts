import { OAuthToken } from '@prisma/client'
import { RequestHandler } from 'express'
import { Email } from '../../../services'
import {
  postGetThreadsHandlerType,
  ThreadsType
} from '../postGetThreadsHandler'

export const getGetSizeEsitmatedHandler: RequestHandler = async (req, res) => {
  // Getting parameters of the req [body - session]
  const { access_token, oauth_id, user_id } = req.session
    .oauth_user_data as OAuthToken
  const { q, fields }: postGetThreadsHandlerType = req.body

  try {
    // getting the msg from the GMAIL API
    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>({
      access_token,
      maxResults: null,
      distnation: `${oauth_id}/threads/`,
      fields,
      q
    })
    if (!data)
      return res.json({
        error: `Error: failed to get size estimated`,
        data: null
      })

    return res.json({ error: null, data: data })
  } catch (error) {
    return null
  }
}
