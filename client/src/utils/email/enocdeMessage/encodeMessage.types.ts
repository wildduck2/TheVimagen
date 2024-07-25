import { IEmail } from 'gmail-api-parse-message-ts'

export type EncodeMEssageType = {
  thread: IEmail
  htmlContent: string
  to: {
    name: string
    email: string
  }
}
