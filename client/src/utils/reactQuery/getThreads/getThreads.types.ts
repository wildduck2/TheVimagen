import { ThreadMessageType, GetThreadType } from '../getThread'

export type GetThreads = {
  q?: string | null
  maxResults?: number | null
  nextPageId?: string | null
}
export type GetThreadsRes = Awaited<Promise<{ error: string | null; data: ThreadMessageType }>>

export type ThreadsType = {
  threads: GetThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}
