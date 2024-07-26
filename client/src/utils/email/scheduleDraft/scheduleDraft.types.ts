import { ThreadsReplyContentRef } from '@/components/layouts'

export type ScheduleDraftRes = {
  data: string | null
  error: string | null
}

export type ScheduleDraftType = {
  threadsReplyContent: ThreadsReplyContentRef[]
}
