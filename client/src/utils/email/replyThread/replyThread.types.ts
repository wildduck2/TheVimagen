import { IEmail } from 'gmail-api-parse-message-ts'
import { MessageType } from '../getThread'

export type ReplyThreadType = {
  htmlContent: string
  thread: IEmail
  emails: string[]
}
export type ReplyThreadRes = {
  data: MessageType | null
  error: string | null
}
