import { ThreadMessageType, GetThreadType, MessageType } from '../getThread'

export type getThreads = {
  id: string
  nextPageToken: string
  messages: MessageType[]
}

export type GetThreadsRes = Awaited<Promise<{ error: string | null; data: ThreadMessageType }>>

export type ThreadsType = {
  threads: GetThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}

export type QueryKeyType = [
  string,
  {
    q?: string | null
    maxResults?: number | null
    fields: string
  },
]
