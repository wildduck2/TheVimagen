import axios from 'axios'
import {
  FetchEachOneWithIdType,
  GetIdsFromGmailAPIType,
  ThreadModifyGroupLabelResType,
  ThreadModifyGroupLabelType,
  ThreadModifyGroupRes,
  ThreadModifyGroupType,
  ThreadModifyResType,
  ThreadModifyType,
  ThreadReplyRes,
  ThreadReplyType,
  ThreadTrashType
} from './Email.type'
import { MessageType, ThreadResType } from 'controllers'
import { GMAIL_URL } from '../../constants'
import base64url from 'base64url'

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

  static async threadModifyGroupLabel({
    distnation,
    access_token,
    addLabelIds,
    removeLabelIds,
    threadIds,
    actionType
  }: ThreadModifyGroupLabelType): Promise<
    (ThreadModifyGroupLabelResType | null)[] | null
  > {
    try {
      const threadsModifiedAsync = threadIds.map(async (id) => {
        try {
          const { data } = await axios.post<
            Promise<ThreadModifyGroupLabelResType>
          >(
            `${GMAIL_URL}${distnation}${id}${actionType}`,
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
          if (!data) return null

          // console.log(data)

          return data
        } catch (error) {
          return null
        }
      })

      // Execute all requests and preserve order
      const results = await Promise.all(threadsModifiedAsync)
      if (!results) return null
      // console.log(results)

      return results
    } catch (error) {
      return null
    }
  }

  static async threadTrash({ id, distnation, access_token }: ThreadTrashType) {
    try {
      const { data } = await axios.post<ThreadModifyResType>(
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

  static async threadReply({
    access_token,
    distnation,
    threadId,
    encodedMessage
  }: ThreadReplyType) {
    try {
      const { data } = await axios.post<Promise<ThreadReplyRes>>(
        `${GMAIL_URL}${distnation}`,
        {
          raw: encodedMessage,
          threadId: threadId
        },
        {
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

  static async threadModifyGroup({
    access_token,
    distnation,
    threadIds,
    actionType
  }: ThreadModifyGroupType): Promise<(ThreadModifyGroupRes | null)[] | null> {
    try {
      const threadsModifiedAsync = threadIds.map(async (id) => {
        try {
          const { data } = await axios.post<ThreadModifyGroupRes>(
            `${GMAIL_URL}${distnation}${id}${actionType}`,
            {
              // addLabelIds: ['INBOX']
            },
            {
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
      })

      // Execute all requests and preserve order
      const results = await Promise.all(threadsModifiedAsync)
      if (!results) return null

      return results
    } catch (error) {
      return null
    }
  }
}
