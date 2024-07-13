import { MessageType } from '../getThread'
export const groupMessagesBySender = (threads: MessageType[]) => {
  const grouped = new Map<string, Map<string, MessageType[]>>()

  threads.forEach((message) => {
    const threadId = message.threadId
    const date = new Date(parseInt(message.internalDate))
    const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    if (!grouped.has(threadId)) {
      grouped.set(threadId, new Map())
    }

    const threadMap = grouped.get(threadId)!
    if (!threadMap.has(dayKey)) {
      threadMap.set(dayKey, [])
    }

    threadMap.get(dayKey)!.push(message)
  })

  const result: { threadId: string; day: string; messages: MessageType[] }[] = []

  // Iterate over each thread
  grouped.forEach((dateMap, threadId) => {
    // Iterate over each date within the thread's messages
    dateMap.forEach((messages, date) => {
      // Push an object representing each day and its thread ID into the result array
      result.push({
        threadId: threadId,
        day: date,
        messages: messages,
      })
    })
  })

  // Sort the result array by day
  result.sort((a, b) => {
    // Convert day strings to Date objects for comparison
    const dateA = new Date(a.day) as unknown as number
    const dateB = new Date(b.day) as unknown as number
    return dateB - dateA
  })

  return result.map((item) => item.messages)
}
