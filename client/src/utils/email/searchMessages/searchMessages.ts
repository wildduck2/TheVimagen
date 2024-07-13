import { MessageType } from '../getThread'
import { SearchMessagesType } from './searchMessages.types'

export function searchMessages({ messages, searchText }: SearchMessagesType): MessageType[] {
  // Flatten the messages array if it's a 2D array
  const flattenedMessages = Array.isArray(messages[0])
    ? (messages as MessageType[][]).flat()
    : (messages as MessageType[])

  // Convert the search text to lowercase for case-insensitive search
  const lowercasedSearchText = searchText.toLowerCase()

  // Filter messages that contain the search text in any relevant field
  return flattenedMessages.filter((message) => {
    return (
      message.snippet.toLowerCase().includes(lowercasedSearchText) ||
      message.payload.headers.some(
        (header) =>
          header.name.toLowerCase().includes(lowercasedSearchText) ||
          header.value.toLowerCase().includes(lowercasedSearchText),
      )
    )
  })
}
