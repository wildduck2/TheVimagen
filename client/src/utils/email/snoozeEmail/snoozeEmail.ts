import { toast } from 'sonner'
import { ModifyThreadRsponse } from '../modifyThread'
import { SnoozeEmailType } from './snoozeEmail.types'
import axios from 'axios'

export const snoozeEmail = async ({ date, threads }: SnoozeEmailType) => {
  const thread_ids = threads.map((thread) => thread.id)

  try {
    const { data } = await axios.post<Awaited<Promise<ModifyThreadRsponse>>>(
      `${process.env.ROOT_URL}/email/snooze/thread`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        addLabelIds: ['SNOOZED'],
        removeLabelIds: ['INBOX'],
        thread_ids,
        snooze_until: date,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!data.messages) return null

    return data.messages
  } catch (error) {
    toast.error('Thread is not snoozed')
    return null
  }
}
