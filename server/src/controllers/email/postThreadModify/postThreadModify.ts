import { RequestHandler } from 'express'
import { postThreadModifyType } from './postThreadModify.types'
import { Email } from '@services/Email'
import { OAuthToken } from '@prisma/client'

export const postThreadModify: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const { addLabelIds, removeLabelIds, threadIds }: postThreadModifyType =
    req.body

  console.log(addLabelIds, removeLabelIds, threadIds)

  try {
    const data = await Email.threadModifyGroupLabel({
      removeLabelIds,
      addLabelIds,
      access_token,
      distnation: `${oauth_id}/threads/`,
      threadIds,
      actionType: '/modify'
    })

    if (!data) return res.json({ error: 'failed to modify thread', data: null })

    return res.json({ error: null, data })
  } catch (error) {
    return res.json({ error: 'failed to modify thread', data: null })
  }
}
