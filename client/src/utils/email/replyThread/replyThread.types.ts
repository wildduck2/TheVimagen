import { IEmail } from 'gmail-api-parse-message-ts'
import { MessageType } from '../getThread'
import { ReplyStatusType } from '@/context'

export type ReplyThreadType = {
  htmlContent: string
  thread: IEmail
  replyStatus: ReplyStatusType
  emails: string[]
}
export type ReplyThreadRes = {
  data: MessageType | null
  error: string | null
}
