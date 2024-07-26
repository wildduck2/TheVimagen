import axios from 'axios'
import { toast } from 'sonner'
import { CreateDraftTHreadRes, CreateDraftTHreadType } from './createDraftThread.types'
import { encodeMessage } from '@/utils'

export const createDraftThread = async ({ threadsReplyContent }: CreateDraftTHreadType) => {
    const encodedMessages = threadsReplyContent.flatMap((thread) => {
        return thread.emails.map((item) => {
            const email = { email: item, name: '' }
            return {
                encodedMessage: encodeMessage({ thread: thread.thread, htmlContent: thread.content as string, to: email }),
                email: item,
                threadId: item === thread.thread.from.email ? thread.thread.threadId : null,
            }
        })
    })

    try {
        const { data } = await axios.post<Awaited<Promise<CreateDraftTHreadRes>>>(
            `${process.env.ROOT_URL}/email/draft/thread`,
            {
                encodedMessages,
            },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        if (!data) {
            toast.info('Messages failed to draft successfuly!')
            return null
        }

        toast.info('Messages moved to draft successfuly!')
        return data
    } catch (error) {
        toast.info('Messages failed to draft successfuly!')
        return null
    }
}
