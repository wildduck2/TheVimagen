import { SearchMessagesType } from './searchMessages.types'
import { IEmail } from 'gmail-api-parse-message-ts'

export function searchMessages({ messages, searchText }: SearchMessagesType): IEmail[] {
  // Convert the search text to lowercase for case-insensitive search
  const lowercasedSearchText = searchText.toLowerCase()

  // Filter messages that contain the search text in any relevant field
  return messages.filter((message) => {
    const { subject, snippet, textPlain, textHtml, from, to, cc, bcc } = message

    // Function to check if an email address matches the search text
    const emailMatches = (emailObj: { name: string; email: string }) =>
      emailObj.name.toLowerCase().includes(lowercasedSearchText) ||
      emailObj.email.toLowerCase().includes(lowercasedSearchText)

    // Check if any of the fields contain the search text
    return (
      subject.toLowerCase().includes(lowercasedSearchText) ||
      snippet.toLowerCase().includes(lowercasedSearchText) ||
      textPlain.toLowerCase().includes(lowercasedSearchText) ||
      textHtml.toLowerCase().includes(lowercasedSearchText) ||
      emailMatches(from) ||
      to.some(emailMatches) ||
      cc.some(emailMatches) ||
      bcc.some(emailMatches)
    )
  })
}
