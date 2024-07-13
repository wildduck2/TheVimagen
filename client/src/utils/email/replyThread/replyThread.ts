import axios from 'axios'
import base64url from 'base64url'
import { ReplyThreadRes, ReplyThreadType } from './replyThread.types'
import { Base64 } from 'js-base64'

export const replyThread = async ({ from, to, subject, threadId, inReplyTo, htmlContent }: ReplyThreadType) => {
  const rawMessage = [
    `From: ${from}`,
    `To: ${to}`,
    `In-Reply-To: ${inReplyTo}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=UTF-8',
    'MIME-Version: 1.0',
    '',
    htmlContent,
  ].join('\r\n')

  const encodedMessage = Base64.encode(rawMessage)

  try {
    const { data } = await axios.post<ReplyThreadRes>(
      `${process.env.ROOT_URL}/email/reply/thread`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        threadId,
        encodedMessage,
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
