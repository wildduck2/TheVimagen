import axios from 'axios'
import { ReplyThreadRes, ReplyThreadType } from './replyThread.types'
import { encodeMessage } from '@/utils'

export const replyThread = async ({ thread, emails, htmlContent }: ReplyThreadType) => {
    const { threadId, from } = thread

    const messages = emails.map((item) => {
        const email = { email: item, name: thread.from.name }
        return {
            encodedMessage: encodeMessage({ thread, htmlContent, to: email }),
            email: item,
            threadId: from.email === item ? threadId : null,
        }
    })

    try {
        const { data } = await axios.post<ReplyThreadRes>(
            `${process.env.ROOT_URL}/email/reply/thread`,
            {
                user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
                encodedMessages: messages,
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
