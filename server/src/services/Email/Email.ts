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
import { prisma } from 'utils'
import { encode } from 'js-base64'

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
      const boundary = 'boundary123'
      const emailParts = [
        `To: wezonaser50@gmail.com`,
        `From: wezonaser50@gmail.com`,
        `Subject: Hello mr duck`,
        'Content-Type: multipart/mixed; boundary="' + boundary + '"',
        '',
        '--' + boundary,
        'Content-Type: text/plain; charset="UTF-8"',
        'Content-Transfer-Encoding: 7bit',
        '',
        'Hello mr duck what do you want to eat',
        '',
        '--' + boundary,
        'Content-Type: text/html; charset="UTF-8"',
        'Content-Transfer-Encoding: base64',
        'Content-Disposition: attachment; filename="message.html"',
        '',
        encode('that is my message'),
        '--' + boundary + '--'
      ]

      const email = emailParts.join('\n')
      const raw = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

      const threadsSentAsync = encodedMessages.map(
        async ({ encodedMessage, threadId }) => {
          try {
            const { data } = await axios.post<Promise<ThreadReplyRes>>(
              `${GMAIL_URL}${distnation}`,
              {
                raw: raw,
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
      const { data } = await axios.get(`${GMAIL_URL}me/labels`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      })
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
        `${GMAIL_URL}/me/labels`,
        {
          name: label_name,
          labelListVisibility: 'labelShow',
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

    if (labelNames?.includes(label_name)) {
      return labels.find((label) => label.name === label_name)!.id
    } else {
      return await this.createLabel({ access_token, label_name })
    }
  }

  static async scheduleEmail({
    thread_id,
    user_id,
    snooze_until
  }: ScheduleEmailType) {
    try {
      const snoozed = prisma.snoozedThread.upsert({
        where: {
          thread_id,
          user_id
        },
        update: {
          snooze_until
        },
        create: {
          thread_id,
          user_id,
          status: 'pending',
          snooze_until
        }
      })
      if (!snoozed) return null

      return snoozed
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
  thread_id: string
  user_id: string
  snooze_until: Date
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
