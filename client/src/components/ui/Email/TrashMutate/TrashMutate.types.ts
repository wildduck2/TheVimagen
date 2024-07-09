import { ThreadMessageType } from '@/utils'

export type TrashMutateType = {
  threadId: string
  tip: string
}

export interface PaginatedMessages {
  pages: ThreadMessageType[]
  pageParams: string[]
}
