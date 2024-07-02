import { ThreadType } from '../post_thread'

export type post_threads_type = {
  maxResults: number
  labelIds: string
}

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}
export type ThreadsDataType = {
  threads: ThreadType[]
  nextPageToken: string
  historyId: string
}
