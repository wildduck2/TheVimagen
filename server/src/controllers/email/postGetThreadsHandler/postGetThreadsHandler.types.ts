import { ThreadType } from '../postGetThreadHandler'

export type postGetThreadsHandlerType = {
  maxResults: number
  q: string
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
