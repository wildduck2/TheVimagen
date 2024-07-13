import { MessageType } from '../getThread'

export type SearchMessagesType = {
  messages: MessageType[] | MessageType[][]
  searchText: string
}
