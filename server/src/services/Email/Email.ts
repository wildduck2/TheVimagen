import axios from 'axios'
import {
  FetchEachOneWithIdType,
  GetIdsFromGmailAPIType,
  ThreadCreateHandlerType,
  ThreadModifyGroupLabelResType,
  ThreadModifyGroupLabelType,
  ThreadModifyGroupRes,
  ThreadModifyGroupType,
  ThreadReplyRes,
  ThreadReplyType,
  ThreadTrashType
} from './Email.type'
import { EncodedMessagesType, MessageType, ThreadResType } from 'controllers'
import { GMAIL_URL } from '../../constants'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { env } from 'config'

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

  //NOTE: full
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
    console.log(
      threadIds,
      distnation,
      access_token,
      addLabelIds,
      removeLabelIds,
      actionType
    )

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

          return data
        } catch (error) {
          console.log(error)
          return null
        }
      })

      // Execute all requests and preserve order
      const results = await Promise.all(threadsModifiedAsync)
      if (!results) return null

      return results
    } catch (error) {
      console.log(error)
      return null
    }
  }

  //NOTE: full
  static async threadReply({
    access_token,
    distnation,
    encodedMessages
  }: ThreadReplyType) {
    try {
      const threadsSentAsync = encodedMessages.map(
        async ({ encodedMessage, threadId }) => {
          try {
            const { data } = await axios.post<Promise<ThreadReplyRes>>(
              `${GMAIL_URL}${distnation}`,
              {
                raw: encodedMessage,
                threadId
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
            console.log(error)
            return null
          }
        }
      )

      // Execute all requests and preserve order
      const results = await Promise.all(threadsSentAsync)
      if (!results) return null

      return results
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async threadCreateThreadHandler({
    access_token,
    distnation,
    encodedMessages
  }: ThreadCreateHandlerType) {
    try {
      const draftsRequests = encodedMessages.map(
        async ({ encodedMessage, threadId }) => {
          try {
            const { data } = await axios.post<ThreadModifyGroupRes>(
              `${GMAIL_URL}${distnation}`,
              {
                message: {
                  raw: encodedMessage,
                  threadId: threadId
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  'Content-Type': 'application/json; charset=UTF-8'
                }
              }
            )
            if (!data) return null
            return data || true
          } catch (error) {
            console.log(error)
            return null
          }
        }
      )

      // Execute all requests and preserve order
      const results = await Promise.all(draftsRequests)
      if (!results) return null

      return results
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async getLabels({
    access_token
  }: {
    access_token: string
  }): Promise<LabelType[]> {
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/gmail/v1/users/me/labels',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (!data) return []

      return data.labels
    } catch (error) {
      console.error('Error fetching labels', error)
      return []
    }
  }

  static async createLabel({
    label_name,
    access_token
  }: {
    label_name: string
    access_token: string
  }): Promise<string> {
    try {
      const response = await axios.post(
        'https://www.googleapis.com/gmail/v1/users/me/labels',
        {
          name: label_name,
          labelListVisibility: 'labelHide',
          messageListVisibility: 'hide',
          type: 'system'
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(`Label '${label_name}' created successfully`)
      return response.data.id
    } catch (error) {
      console.error('Error creating label', error)
      throw new Error('Failed to create label')
    }
  }

  static async ensureLabelExists({
    access_token,
    label_name
  }: {
    label_name: string
    access_token: string
  }): Promise<string> {
    const labels = await this.getLabels({ access_token })

    const labelNames = labels
      .map((label: LabelType) => label.name)
      .find((label) => label === label_name)!
    console.log(labelNames)

    if (labelNames?.includes(label_name)) {
      console.log(`Label '${label_name}' already exists`)
      return labels.find((label) => label.name === label_name)!.id
    } else {
      return await this.createLabel({ access_token, label_name })
    }
  }

  static async scheduleEmail({
    thread_ids,
    snoozed_until,
    distnation,
    access_token,
    addLabelIds,
    removeLabelIds
  }: ScheduleEmailType) {
    const currentTime = new Date().getTime()
    const delay = new Date(snoozed_until).getTime() - currentTime

    try {
      const data = await this.threadModifyGroupLabel({
        distnation,
        access_token,
        addLabelIds,
        removeLabelIds,
        threadIds: thread_ids,
        actionType: '/modify'
      })
      if (!data) return null

      // setTimeout(async () => {
      //   try {
      //     const data = await this.threadModifyGroupLabel({
      //       distnation,
      //       access_token,
      //       addLabelIds,
      //       removeLabelIds,
      //       threadIds: [thread_id],
      //       actionType: 'modify'
      //     })
      //     if (!data) return null
      //
      //     console.log('Message unsnoozed successfully')
      //     this.sendNotification({ thread_id })
      //   } catch (error) {
      //     console.error('Error unsnoozing message', error)
      //     return null
      //   }
      // }, 20000)
      return data
    } catch (error) {
      console.error('Error snoozing message', error)
      return null
    }
  }

  static sendNotification = ({ thread_id }: { thread_id: string }) => {
    console.log(thread_id)
  }
}

export type ScheduleEmailType = {
  thread_ids: string[]
  distnation: string
  snoozed_until: string
  access_token: string
  addLabelIds: string[]
  removeLabelIds: string[]
}

export type LabelType = {
  id: string
  name: string
  messageListVisibility: 'show' | 'hide'
  labelListVisibility: 'labelShow' | 'labelHide' | 'labelShowIfUnread'
  type: 'system' | 'user'
  messagesTotal: number
  messagesUnread: number
  threadsTotal: number
  threadsUnread: number
  color: {
    textColor: string
    backgroundColor: string
  }
}
// 'q': '-has:userlabels -in:sent -in:chat -in:draft in:inbox'
