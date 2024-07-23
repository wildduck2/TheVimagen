import { IEmail } from 'gmail-api-parse-message-ts'

export const groupMessagesBySender = (threads: IEmail[]) => {
  const grouped = new Map<string, IEmail[]>()

  // Group messages by threadId
  threads?.forEach((message) => {
    const threadId = message.threadId

    if (!grouped.has(threadId)) {
      grouped.set(threadId, [])
    }

    grouped.get(threadId)!.push(message)
  })

  // Sort messages within each thread by internalDate in descending order
  grouped?.forEach((messages, threadId) => {
    messages.sort((a, b) => a.internalDate - b.internalDate)
  })

  // Convert the grouped messages map to an array of arrays
  const threadsArray: IEmail[][] = Array.from(grouped.values())

  // Sort threads by the date of the last message within each thread
  threadsArray.sort((threadA, threadB) => {
    const lastMessageDateA = threadA[0].internalDate
    const lastMessageDateB = threadB[0].internalDate

    return lastMessageDateB - lastMessageDateA
  })

  return threadsArray
}
