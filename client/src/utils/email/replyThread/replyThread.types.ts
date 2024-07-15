import { MessageType } from '../getThread'

export type ReplyThreadType = {
  threadId: string
  from: string
  to: string
  subject: string
  htmlContent: string
}
export type ReplyThreadRes = {
  data: MessageType | null
  error: string | null
}
