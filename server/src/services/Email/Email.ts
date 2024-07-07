import axios from 'axios'
import {
  FetchEachOneWithIdType,
  GetIdsFromGmailAPIType,
  ThreadModifyType,
  ThreadTrashType
} from './Email.type'
import { MessageType, ThreadResType } from 'controllers'
import { GMAIL_URL } from '../../constants'
import { on } from 'node:events'

export class Email {
  constructor() {}

  //NOTE: tested
  static async getMessagesIdsFromGmailAPI<T>({
    access_token,
    maxResults,
    distnation,
    fields,
    q
  }: GetIdsFromGmailAPIType): Promise<T | null> {
    try {
      const { data } = await axios.get<Awaited<Promise<T>>>(
        `${GMAIL_URL}${distnation}`,
        {
          withCredentials: true,
          params: {
            fields,
            maxResults,
            q
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      )
      if (!data) return null

      return data
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async fetchEachOneWithId<
    T extends MessageType,
    K extends ThreadResType
  >({
    groupOfIds,
    access_token,
    distnation,
    fields,
    format
  }: FetchEachOneWithIdType): Promise<T[] | null> {
    const messagesData: T[] = []

    try {
      // Fetch detailed data for each thread
      const detailedDataPromises = groupOfIds.map(async (thread) => {
        try {
          // Fetch detailed thread data
          const { data } = await axios.get<Awaited<Promise<K>>>(
            `${GMAIL_URL}${distnation}${thread}`,
            {
              params: {
                fields,
                format
              },
              headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json; charset=UTF-8'
              }
            }
          )
          const { messages } = data
          if (!messages) return null

          return messages as T[]
        } catch (error) {
          return null
        }
      })

      // Execute all requests and preserve order
      const results = await Promise.all(detailedDataPromises)
      results.forEach((messages) => {
        if (messages && messages.length > 0) {
          messagesData.push(...messages)
        }
      })

      return messagesData
    } catch (error) {
      return null
    }
  }

  static async threadModify({
    distnation,
    access_token,
    addLabelIds,
    removeLabelIds = []
  }: ThreadModifyType): Promise<ThreadResType | null> {
    try {
      const { data } = await axios.post<ThreadResType>(
        `${GMAIL_URL}${distnation}`,
        {
          addLabelIds,
          removeLabelIds
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(data)

      if (!data) return null

      return data
    } catch (error) {
      return null
    }
  }

  static async threadTrash({ id, distnation, access_token }: ThreadTrashType) {
    try {
      const { data } = await axios.post<ThreadResType>(
        `${GMAIL_URL}${distnation}`,
        {
          id
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(data)

      if (!data) return null

      return data
    } catch (error) {
      return null
    }
  }
}
