export interface initialStateTypes {
  threads_data: ThreadsType | null
}

export type ThreadType = {
  id: string
  snippet: string
  historyId: string
}

export type ThreadsType = {
  threads: ThreadType[]
  nextPageToken: string
  resultSizeEstimate: number
}

export interface GetThreadsState {
  threads_data: ThreadsType | null
}

export interface GetThreadsAction {
  payload: ThreadsType | null
}
