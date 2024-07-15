import { MessageType } from '../getThread'

export const groupMessagesBySender = (threads: MessageType[]) => {
  const grouped = new Map<string, MessageType[]>()

  threads.forEach((message) => {
    const threadId = message.threadId

    if (!grouped.has(threadId)) {
      grouped.set(threadId, [])
    }

    grouped.get(threadId)!.push(message)
  })

  // Sort messages within each thread by internalDate in descending order
  grouped.forEach((messages, threadId) => {
    messages.sort((a, b) => parseInt(b.internalDate) - parseInt(a.internalDate))
  })

  // Convert the grouped messages map to an array of arrays
  const threadsArray: MessageType[][] = Array.from(grouped.values())

  // Sort threads by the date of the last message within each thread
  threadsArray.sort((threadA, threadB) => {
    const lastMessageDateA = parseInt(threadA[0].internalDate)
    const lastMessageDateB = parseInt(threadB[0].internalDate)

    return lastMessageDateB - lastMessageDateA
  })

  return threadsArray
}
