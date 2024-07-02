import { ThreadMessageType, ThreadType } from '../getThread'

export type getThreads = null
export type getThreads_res = Awaited<Promise<{ error: string | null; data: ThreadMessageType }>>

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}
