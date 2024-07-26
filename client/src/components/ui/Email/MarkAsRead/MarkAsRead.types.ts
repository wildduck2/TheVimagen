import { IEmail } from 'gmail-api-parse-message-ts'

export type MarkAsReadMutateType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
  marktype: 'READ' | 'UNREAD'
}
