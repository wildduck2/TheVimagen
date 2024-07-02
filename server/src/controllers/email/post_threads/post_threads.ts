import { RequestHandler } from 'express'
import { OAuthToken } from '@prisma/client'
import { post_threads_type } from './post_threads.types'
import { Email } from 'services'

export const post_threads: RequestHandler = async (req, res) => {
  // Getting parameters of the req [body - session]
  const { access_token, oauth_id, user_id } = req.session
    .oauth_user_data as OAuthToken
  const { maxResults = 4, labelIds }: post_threads_type = req.body

  try {
    // getting the msg from the GMAIL API
    const data = await Email.getIdsFromGmailAPI({
      access_token,
      maxResults,
      distnation: `${oauth_id}/threads/`,
      fields: 'threads(id),nextPageToken',
      labelIds
    })
    if (!data)
      return res.json({ error: `Error: failed to get threads`, data: null })

    // Handle threads are not existed
    const { threads, nextPageToken } = data
    if (!threads || threads.length === 0) {
      return res.status(404).json({ error: 'No threads found.' })
    }

    // Fetch detailed data for each thread
    const messagesData = await Email.fetchEachOneWithId({
      access_token,
      groupOfIds: threads,
      distnation: `${oauth_id}/threads/`,
      fields: '',
      format: 'metadata'
    })
    if (!messagesData)
      return res.json({ error: 'Error: failed to fetch threads', data: null })

    // Construct final response object
    const finalResponse = {
      id: user_id,
      nextPageToken: nextPageToken || null,
      messages: messagesData
    }

    // Send response
    return res.json({ error: null, data: finalResponse })
  } catch (error) {
    return res.json({ error: 'failed to get msgs', data: null })
  }
}
