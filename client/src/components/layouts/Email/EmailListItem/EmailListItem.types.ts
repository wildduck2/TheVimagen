import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailListItemType = {
  item: IEmail
  items?: IEmail[] | null
}
