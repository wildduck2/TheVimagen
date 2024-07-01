import { ThreadMessageType, ThreadType } from '../get_thread'

export type get_threads = null
export type get_threads_res = Awaited<Promise<{ error: string | null; data: ThreadMessageType }>>

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}
