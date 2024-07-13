import { ThreadMessageType } from '@/utils'

export type TrashMutateType = {
  threadId: string
  tip: string
  disabled?: boolean
}

export interface PaginatedMessages {
  pages: ThreadMessageType[]
  pageParams: string[]
}
