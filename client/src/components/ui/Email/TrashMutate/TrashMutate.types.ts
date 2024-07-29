import { ThreadMessageType } from '@/utils'
import { IEmail } from 'gmail-api-parse-message-ts'

export type TrashMutateType = {
  threads: IEmail[]
}

export interface PaginatedMessages {
  pages: ThreadMessageType[]
  pageParams: string[]
}
