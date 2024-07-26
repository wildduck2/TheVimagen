import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailReplyThreadProps = {
  e: React.FormEvent<HTMLElement>
  body: string
  emails: string[]
  selectedThread: IEmail[]
}
