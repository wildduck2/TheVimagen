import { ReplyStatusType } from '@/context'
import { IEmail } from 'gmail-api-parse-message-ts'

export type EncodeMEssageType = {
  thread: IEmail
  htmlContent: string
  replyStatus: ReplyStatusType
  to: {
    name: string
    email: string
  }
}
