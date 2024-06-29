import axios from 'axios'
import { RequestHandler } from 'express'
import { OAuthToken } from '@prisma/client'
import { post_threads_type, ThreadsType } from './post_threads.types'

export const post_threads: RequestHandler = async (req, res) => {
  const oauth_user_data = req.session.oauth_user_data as OAuthToken
  const { maxResults = 2 }: post_threads_type = req.body

  try {
    //NOTE: getting the msg from the GMAIL API
    const { data } = await axios.get<
      Promise<{ error: string | null; data: ThreadsType }>
    >(
      `https://gmail.googleapis.com/gmail/v1/users/${oauth_user_data.oauth_id}/threads`,
      {
        withCredentials: true,
        params: {
          maxResults,
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

    return res.json({ error: null, data: data })
  } catch (error) {
    return res.json({ error: 'failed to get msgs', data: null })
  }
}
