import axios from 'axios'
import { toast } from 'sonner'
import { ScheduleDraftRes, ScheduleDraftType } from './scheduleDraft.types'
import { encodeMessage } from '@/utils'

export const ScheduleDraft = async ({ threadsReplyContent }: ScheduleDraftType) => {
  const encodedMessages = threadsReplyContent.map((thread) => {
    return {
      threadId: thread.thread.threadId,
      encodeMessage: encodeMessage({ thread: thread.thread, htmlContent: thread.content as string }),
    }
  })

  try {
    const { data } = await axios.post<Awaited<Promise<ScheduleDraftRes>>>(
      `${process.env.ROOT_URL}/email/schedule/thread`,
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
