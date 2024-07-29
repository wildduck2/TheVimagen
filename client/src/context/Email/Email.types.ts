import { LabelType } from '@/components/ui'
import { IEmail } from 'gmail-api-parse-message-ts'

export interface initialStateEmailTypes {
  selectedThread: IEmail[]
  selectedThreads: IEmail[]
  searchInput: string
  threadsFetched: IEmail[]
  multiReply: MultiReplyType
  replyStatus: ReplyStatusType
  snoozeButtonStatus: SnoozeButtonStatusType
  labelButtonStatus: LabelButtonStatusType
  labelModificationSelected: LabelModificationSelectedType
}

export type LabelButtonStatusType = {
  labelButtonStatus: boolean
  onTheFlyAction?: boolean
}

export type LabelModificationSelectedType = {
  label: LabelType | null
  type: 'remove' | 'add' | null
}

export type SnoozeButtonStatusType = {
  snoozeButtonStatus: boolean
  onTheFlyAction?: boolean
}

export type ReplyStatusType = { replyAll: boolean; forward: boolean; attachment: boolean }
export type MultiReplyType = { alert: boolean; drawer: boolean }

export type MultiReplyState = {
  multiReply: MultiReplyType
}

export type MultiReplyAction = {
  payload: MultiReplyType
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

export type ReplyStatusState = {
  replyStatus: ReplyStatusType
}

export type ReplyStatusAction = {
  payload: ReplyStatusType
}

export type SnoozeButtonStatusState = {
  snoozeButtonStatus: SnoozeButtonStatusType
}
export type SnoozeButtonStatusAction = {
  payload: SnoozeButtonStatusType
}

export type LabelModificationSelectedState = {
  labelModificationSelected: LabelModificationSelectedType
}

export type LabelModificationSelectedAction = {
  payload: LabelModificationSelectedType
}

export type LabelButtonStatusState = {
  labelButtonStatus: LabelButtonStatusType
}
export type LabelButtonStatusAction = {
  payload: LabelButtonStatusType
}
