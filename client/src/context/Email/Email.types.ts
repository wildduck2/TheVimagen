import { IEmail } from 'gmail-api-parse-message-ts'

export interface initialStateEmailTypes {
  selectedThread: IEmail[]
  selectedThreads: IEmail[]
  searchInput: string
  threadsFetched: IEmail[]
}

export type SelectedEmailDataState = {
  selectedThread: IEmail[]
}

export type SelectedEmailDataAction = {
  payload: IEmail[]
}

export type SearchInputIdState = {
  searchInput: string
}

export type SearchInputIdAction = {
  payload: string
}

export type SelectedThreadsState = {
  selectedThreads: IEmail[]
}

export type SelectedThreadsAction = {
  payload: IEmail[]
}

export type ThreadsFetchedState = {
  threadsFetched: IEmail[]
}

export type ThreadsFetchedAction = {
  payload: IEmail[]
}
