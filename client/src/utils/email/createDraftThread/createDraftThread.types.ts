import { ThreadsReplyContentRef } from '@/components/layouts'

export type CreateDraftTHreadRes = {
  data: string | null
  error: string | null
}

export type CreateDraftTHreadType = {
  threadsReplyContent: ThreadsReplyContentRef[]
}
