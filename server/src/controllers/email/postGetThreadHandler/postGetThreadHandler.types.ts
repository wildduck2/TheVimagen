export type PostThreadHandler = {
  threads_id: string[]
}

export type ThreadType = {
  id: string
  snippet: string
  historyId: string
  messages: MessageType[]
}

export type ThreadResType = {
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
  raw: string
}

export type PayloadType = {
  mimeType: string
  headers: HeaderType[]
}

export type HeaderType = {
  name: string
  value: string
}

export type BodyType = {
  size: number
  data?: string | null
}

export type PartType = PayloadType[]
