import { ThreadType } from '../postGetThreadHandler'

export type postGetThreadsHandlerType = {
  maxResults: number
  q: string
  pageToken: string
}

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
  pageToken: string
}
export type ThreadsDataType = {
  threads: ThreadType[]
  nextPageToken: string
  historyId: string
}
