import { IEmail } from 'gmail-api-parse-message-ts'

export type ThreadMessageType = {
  id: string
  nextPageToken: string
  messages: MessageType[]
}

export type GetThreadType = {
  threads_id: string[]
}

export type GetThreadRes = {
  error: string | null
  data: IEmail[]
}

export type ThreadFullMessageType = {
  id: string
  historyId: string
  attachments: string
  bcc: string
  cc: string
  from: {
    email: string
    inValid: true
  }
  headers: HeaderType[]
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
  raw: string
}

export type PayloadType = {
  mimeType: string
  headers: HeaderType[]
}

export type LabelIds = ['UNREAD', 'INBOX', 'SUBJECT', 'CATEGORY_UPDATES']

export type HeaderType = {
  name: string
  value: string
}

export type BodyType = {
  size: number
  data?: string | null
}

export type PartType = PayloadType[]
