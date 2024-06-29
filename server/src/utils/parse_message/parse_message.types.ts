export interface Message {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: {
    partId: string
    mimeType: string
    filename: string
    headers: {
      name: string
      value: string
    }[]
    body: {
      attachmentId: string
      size: number
      data: string
    }
    parts: {
      partId: string
      mimeType: string
      filename: string
      headers: {
        name: string
        value: string
      }[]
      body: {
        attachmentId: string
        size: number
        data: string
      }
    }[]
  }
}

export interface GetGoogleGmailResponse {
  messages: Message[]
}

export type GmailMessage = Message
