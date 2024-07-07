import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'
import { PostThreadTrashType } from './postThreadTrash.types'

export const postThreadTrash: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const { threadId }: PostThreadTrashType = req.body
  try {
    const data = await Email.threadTrash({
      access_token,
      distnation: `${oauth_id}/threads/${threadId}/trash`,
      id: threadId
    })

    if (!data)
      return res.json({ error: 'failed to trash the thread', data: null })
    return res.json({ error: null, data: data })
  } catch (error) {
    return res.json({ error: 'failed to trash the thread', data: null })
  }
}
