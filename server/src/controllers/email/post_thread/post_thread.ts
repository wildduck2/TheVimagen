import axios from 'axios'
import { RequestHandler } from 'express'
import { OAuthToken } from '@prisma/client'
import { ParseGmailApi, IEmail } from 'gmail-api-parse-message-ts'

export const post_thread: RequestHandler = async (req, res) => {
  const { thread_id } = req.body
  const oauth_user_data = req.session.oauth_user_data as OAuthToken

  try {
    //NOTE: getting the msg from the GMAIL API
    const { data } = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${oauth_user_data.oauth_id}/threads/${thread_id}`,
      {
        withCredentials: true,
        params: {
          format: 'full'
        },
        headers: {
          Authorization: `Bearer ${oauth_user_data.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!data)
      return res.json({ error: `Error: failed to get threads`, data: null })

    //NOTE: parsing the message to base64
    const parse = new ParseGmailApi()
    const gmailResponse = data.messages[0]
    const email: IEmail = parse.parseMessage(gmailResponse)

    return res.json({ error: null, data: email })
  } catch (error) {
    console.log(error)

    return res.json({ error: 'failed to get msgs', data: null })
  }
}
