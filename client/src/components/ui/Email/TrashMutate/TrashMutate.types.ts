import { ThreadMessageType } from '@/utils'

export type TrashMutateType = {
  threadIds: string[]
  tip: string
  disabled?: boolean
}

export interface PaginatedMessages {
  pages: ThreadMessageType[]
  pageParams: string[]
}
