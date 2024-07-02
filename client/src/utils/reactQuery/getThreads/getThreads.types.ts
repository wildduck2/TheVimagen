import { ThreadMessageType, ThreadType } from '../getThread'

export type GetThreads = {
  labelIds?: string | null
}
export type GetThreadsRes = Awaited<Promise<{ error: string | null; data: ThreadMessageType }>>

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}
