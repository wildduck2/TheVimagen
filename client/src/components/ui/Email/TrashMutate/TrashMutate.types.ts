import { ThreadMessageType } from '@/utils'
import { IEmail } from 'gmail-api-parse-message-ts'

export type TrashMutateType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}

export interface PaginatedMessages {
  pages: ThreadMessageType[]
  pageParams: string[]
}
