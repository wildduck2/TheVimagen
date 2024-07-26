import { IEmail } from 'gmail-api-parse-message-ts'

export type UseMarkAsReadProps = {
  marktype: 'READ' | 'UNREAD'
  threads: IEmail[]
}
