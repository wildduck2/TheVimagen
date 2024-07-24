import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'

export type EncodedMessagesType = {
  threadId: string
  encodeMessage: string
}

export type PostThreadDraftCreateHanlderBodyType = {
  encodedMessages: EncodedMessagesType[]
}

export const postThreadDraftCreateHanlder: RequestHandler = async (
  req,
  res
) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const { encodedMessages } = req.body as PostThreadDraftCreateHanlderBodyType
  try {
    const data = await Email.threadCreateThreadHandler({
      access_token,
      distnation: `${oauth_id}/drafts/`,
      encodedMessages
    })

    console.log(data)

    if (!data) return res.json({ error: 'Failed to create draft', data: null })

    return res.json({ error: null, data: data })
  } catch (error) {
    return res.json({ error: 'Failed to create draft', data: null })
  }
}
