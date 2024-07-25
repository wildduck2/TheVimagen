import { IEmail } from 'gmail-api-parse-message-ts'

export type ReplyToWrapperProps = {
  thread: IEmail
  replyToEmails: React.MutableRefObject<string[]>
}
