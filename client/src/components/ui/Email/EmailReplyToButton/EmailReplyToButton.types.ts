import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailReplyToButtonProps = {
  thread: IEmail
  replyToEmails: React.MutableRefObject<string[]>
}