import axios from 'axios'
import { ReplyThreadRes, ReplyThreadType } from './replyThread.types'
import { Base64 } from 'js-base64'

export const replyThread = async ({ thread, htmlContent }: ReplyThreadType) => {
  const { from, threadId, id, to, subject } = thread
  const rawMessage = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: RE: ${subject}`,
    `In-Reply-To: ${id}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlContent,
    `</div>`,
    `<div style="margin: 1rem">`,
    `---------------------------------`,
    `<p>This email was sent from ${thread.from.name} by <a style="color: blue" href="https://github.com/wildduck2/" target="_blank">TheVimagen</a> app</p>`,
    `---------------------------------`,
    `</div>`,
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
