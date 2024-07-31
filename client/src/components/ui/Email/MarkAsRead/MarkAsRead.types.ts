import { IEmail } from 'gmail-api-parse-message-ts'

export type MarkAsReadMutateType = {
  threads: IEmail[]
  marktype: 'READ' | 'UNREAD'
}
