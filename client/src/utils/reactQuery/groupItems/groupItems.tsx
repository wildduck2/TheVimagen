import { MessageType } from '../getThread'

export const groupMessagesBySender = (threads: MessageType[]) => {
  const grouped: Record<string, MessageType[]> = {}

  threads.forEach((message) => {
    const sender = message.payload.headers.find((header) => header.name === 'From')!.value
    if (!grouped[sender]) {
      grouped[sender] = []
    }
    grouped[sender].push(message)
  })

  return Object.values(grouped)
}
