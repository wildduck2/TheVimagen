import { OAuthToken } from '@prisma/client'
import { RequestHandler } from 'express'
import { postThreadArchiveType } from './postThreadArchive.types'
import { Email } from '@services/Email'

export const postThreadArchive: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const { threadIds }: postThreadArchiveType = req.body

  try {
    const data = await Email.threadModifyGroup({
      access_token,
      distnation: `${oauth_id}/threads/`,
      threadIds,
      actionType: '/trash'
    })

    if (!data)
      return res
        .status(404)
        .json({ error: 'Error: Failed to archive message/s', data: null })
    return res.status(200).json({ error: null, data: data })
  } catch (error) {
    return res
      .status(404)
      .json({ error: 'Error: Failed to archive message/s', data: null })
  }
}
