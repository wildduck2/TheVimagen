import axios from 'axios'
import { RequestHandler } from 'express'
import { OAuthToken } from '@prisma/client'
import { post_threads_type, ThreadsType } from './post_threads.types'
import { MessageType, ThreadMessageType } from '../post_thread'

export const post_threads: RequestHandler = async (req, res) => {
  // Getting parameters of the req [body - session]
  const { access_token, oauth_id, user_id } = req.session
    .oauth_user_data as OAuthToken
  const { maxResults = 4 }: post_threads_type = req.body
  const GMAIL_URL = `https://gmail.googleapis.com/gmail/v1/users/${oauth_id}/threads/`

  try {
    // getting the msg from the GMAIL API
    const { data } = await axios.get<Awaited<Promise<ThreadsType>>>(GMAIL_URL, {
      withCredentials: true,
      params: {
        maxResults,
        format: 'full'
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!data)
      return res.json({ error: `Error: failed to get threads`, data: null })

    // Handle threads are not existed

    const { threads, nextPageToken } = data
    if (!threads || threads.length === 0) {
      return res.status(404).json({ error: 'No threads found.' })
    }

    // Array to store detailed messages from each thread
    const messagesData: MessageType[] = []

    // Fetch detailed data for each thread
    const detailedDataPromises = await Promise.all(
      threads.map(async (thread) => {
        const threadId = thread.id

        try {
          // Fetch detailed thread data
          const { data } = await axios.get<Awaited<Promise<ThreadMessageType>>>(
            `${GMAIL_URL}${threadId}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`
              },
              params: {
                format: 'metadata'
              }
            }
          )

          // Handle errors if there's no data
          const { messages } = data
          if (!messages) return null

          // Return the messages array for concatenation
          return messages
        } catch (error) {
          console.error(`Error fetching thread ${threadId}:`, error)
          return null
        }
      })
    )
    // Execute all requests and preserve order
    await Promise.all(detailedDataPromises).then((results) => {
      results.forEach((messages) => {
        if (messages && messages.length > 0) {
          messagesData.push(...messages)
        }
      })
    })

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
