import { IEmail } from 'gmail-api-parse-message-ts'

export type get_thread = null
export type get_thread_res = Awaited<Promise<{ error: string | null; data: ThreadType }>>

export type ThreadType = {
  id: string
  snippet: string
  historyId: string
}

export type ThreadMessageType = {
  id: string
  historyId: string
  messages: MessageType[]
}

export type MessageType = {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: PayloadType
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export type PayloadType = {
  mimeType: string
  headers: HeaderType[]
}

type LabelIds = ['UNREAD', 'INBOX', 'SUBJECT', 'CATEGORY_UPDATES']

export type HeaderType = {
  name: string
  value: string
}

export type BodyType = {
  size: number
  data?: string | null
}

export type PartType = PayloadType[]
