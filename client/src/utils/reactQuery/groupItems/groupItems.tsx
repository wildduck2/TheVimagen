import { MessageType } from '../getThread'
export const groupMessagesBySender = (threads: MessageType[]) => {
  const grouped = new Map<string, Map<string, MessageType[]>>()

  threads.forEach((message) => {
    const sender = message.payload.headers.find((header) => header.name === 'Subject')!.value
    const date = new Date(parseInt(message.internalDate))
    const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    if (!grouped.has(sender)) {
      grouped.set(sender, new Map())
    }

    const senderMap = grouped.get(sender)!
    if (!senderMap.has(dayKey)) {
      senderMap.set(dayKey, [])
    }

    senderMap.get(dayKey)!.push(message)
  })

  const result: { parentTitle: string; day: string; messages: MessageType[] }[] = []

  // Iterate over each parent title (sender)
  grouped.forEach((dateMap, sender) => {
    // Iterate over each date within the sender's messages
    dateMap.forEach((messages, date) => {
      // Push an object representing each day and its parent title into the result array
      result.push({
        parentTitle: sender,
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
