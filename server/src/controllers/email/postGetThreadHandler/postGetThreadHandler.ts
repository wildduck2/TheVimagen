import { RequestHandler } from 'express'
import { OAuthToken } from '@prisma/client'
import { ParseGmailApi, IEmail } from 'gmail-api-parse-message-ts'
import { Email } from '../../../services'
import { PostThreadHandler } from './postGetThreadHandler.types'

export const postGetThreadHandler: RequestHandler = async (req, res) => {
  const { threads_id }: PostThreadHandler = req.body
  const oauth_user_data = req.session.oauth_user_data as OAuthToken

  try {
    //NOTE: getting the msg from the GMAIL API
    const data = await Email.fetchEachOneWithId({
      groupOfIds: threads_id,
      distnation: `${oauth_user_data.oauth_id}/threads/`,
      access_token: oauth_user_data.access_token,
      format: 'full',
      fields: ''
    })
    console.log(data)

    if (!data)
      return res.json({ error: `Error: failed to get threads`, data: null })

    // //NOTE: parsing the message to base64
    const parse = new ParseGmailApi()
    const email: IEmail[] = data.map((item) => parse.parseMessage(item))
    // console.log(email)

    return res.json({ error: null, data: email })
  } catch (error) {
    console.log(error)

    return res.json({ error: 'failed to get msgs', data: null })
  }
}
