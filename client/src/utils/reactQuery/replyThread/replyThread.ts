import axios from 'axios'
import { MessageType } from '../getThread'

export type ReplyThreadType = {
  threadId: string
  to: string
  subject: string
  inReplyTo: string
  body: string
}
export type ReplyThreadRes = {
  data: MessageType | null
  error: string | null
}
export const replyThread = async ({ to, subject, threadId, inReplyTo, body }: ReplyThreadType) => {
  try {
    const { data } = await axios.post<ReplyThreadRes>(
      `${process.env.ROOT_URL}/email/get/time-estimated`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        to,
        subject,
        threadId,
        inReplyTo,
        body,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!data) return null
    return data
  } catch (error) {
    return null
  }
}
