import { MessageType } from '../getThread'

export const groupMessagesBySender = (threads: MessageType[]) => {
  const grouped: Record<string, Record<string, MessageType[]>> = {}

  // Group messages by sender and day
  threads.forEach((message) => {
    const sender = message.payload.headers.find((header) => header.name === 'Subject')!.value
    const date = new Date(parseInt(message.internalDate))
    const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    if (!grouped[sender]) {
      grouped[sender] = {}
    }
    if (!grouped[sender][dayKey]) {
      grouped[sender][dayKey] = []
    }

    grouped[sender][dayKey].push(message)
  })

  // Prepare the result array
  const result: { parentTitle: string; day: string; messages: MessageType[] }[] = []

  // Sort and collect messages
  Object.keys(grouped).forEach((sender) => {
    Object.keys(grouped[sender]).forEach((day) => {
      const messages = grouped[sender][day]

      // Sort messages within each day by date (newest first)
      messages.sort((a, b) => {
        const dateA = new Date(parseInt(b.internalDate))
        const dateB = new Date(parseInt(a.internalDate))
        return dateA.getTime() - dateB.getTime()
      })

      // Push the latest sorted messages to result
      result.push({
        parentTitle: sender,
        day: day,
        messages: messages,
      })
    })
  })

  // Sort the result array by the most recent message date (newest first)
  result.sort((a, b) => {
    // Get the most recent date from the messages array for comparison
    const dateA = new Date(parseInt(b.messages[0].internalDate))
    const dateB = new Date(parseInt(a.messages[0].internalDate))
    return dateA.getTime() - dateB.getTime()
  })

  // Extract only the messages array from each result item
  const final = result.map((item) => item.messages)

  return final
}
