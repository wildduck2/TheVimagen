import { IEmail } from 'gmail-api-parse-message-ts'

export type SearchMessagesType = {
  messages: IEmail[]
  searchText: string
}
