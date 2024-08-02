import { IAttachment, IEmail } from 'gmail-api-parse-message-ts'

export type EmailReplyBottomProps = {
  valid: boolean
  selectedThread: IEmail
  replyToEmails: React.MutableRefObject<string[]>
  showReplyIcon?: boolean
  files: IAttachment[]
}
