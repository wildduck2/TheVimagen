import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailDisplayInboxItemType = {
  inbox: IEmail | null
  single: boolean
}
