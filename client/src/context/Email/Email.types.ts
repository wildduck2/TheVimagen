export interface initialStateEmailTypes {
  SelectedEmailData: { ids: string[]; inReplyTo: string }
  selectedThreads: string[]
  searchInput: string
  threadsFetched: string[]
}

export type SelectedEmailDataState = {
  SelectedEmailData: { ids: string[]; inReplyTo: string }
}

export type SelectedEmailDataAction = {
  payload: { ids: string[]; inReplyTo: string }
}

export type SearchInputIdState = {
  searchInput: string
}

export type SearchInputIdAction = {
  payload: string
}

export type SelectedThreadsState = {
  selectedThreads: string[]
}

export type SelectedThreadsAction = {
  payload: string[]
}

export type ThreadsFetchedState = {
  threadsFetched: string[]
}

export type ThreadsFetchedAction = {
  payload: string[]
}
