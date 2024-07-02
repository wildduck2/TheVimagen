import axios from 'axios'
import {
  FetchEachOneWithIdType,
  GetIdsFromGmailAPIType,
  GroupMessagesBySenderType
} from './Email.type'
import { MessageType, ThreadMessageType, ThreadsType } from 'controllers'
import { GMAIL_URL } from '../../constants'
import { Record } from '@prisma/client/runtime/library'

export class Email {
  constructor() {}

  static async getIdsFromGmailAPI({
    access_token,
    maxResults,
    distnation,
    fields,
    labelIds
  }: GetIdsFromGmailAPIType) {
    try {
      const { data } = await axios.get<Awaited<Promise<ThreadsType>>>(
        `${GMAIL_URL}${distnation}`,
        {
          withCredentials: true,
          params: {
            fields,
            maxResults,
            format: 'full',
            labelIds
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (!data) return null

      return data
    } catch (error) {
      return null
    }
  }

  static async fetchEachOneWithId({
    groupOfIds,
    access_token,
    distnation,
    fields,
    format
  }: FetchEachOneWithIdType) {
    const messagesData: MessageType[] = []

    try {
      // Fetch detailed data for each thread
      const detailedDataPromises = await Promise.all(
        groupOfIds.map(async (thread) => {
          const threadId = thread.id

          try {
            // Fetch detailed thread data
            const { data } = await axios.get<
              Awaited<Promise<ThreadMessageType>>
            >(`${GMAIL_URL}${distnation}${threadId}`, {
              headers: {
                Authorization: `Bearer ${access_token}`
              },
              params: {
                fields,
                format
              }
            })
            const { messages } = data
            if (!messages) return null

            return messages
          } catch (error) {
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

      return messagesData
    } catch (error) {
      return null
    }
  }
}
