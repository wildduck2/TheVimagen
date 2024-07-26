import { EncodedMessagesType, MessageType, ThreadResType } from 'controllers'

export type GetIdsFromGmailAPIType = {
  access_token: string
  maxResults?: number | null
  distnation: string
  fields: string
  q: string
}
export interface FetchEachOneWithIdType
  extends Omit<GetIdsFromGmailAPIType, 'maxResults' | 'q' | 'pageToken'> {
  groupOfIds: string[]
  format: string
}

export type ThreadModifyGroupLabelType = {
  distnation: string
  access_token: string
  addLabelIds: string[]
  removeLabelIds: string[]
  threadIds: string[]
  actionType: string
}

export type ThreadModifyGroupLabelResType = {
  data: ThreadResType | null
  error: string | null
}

export type ThreadTrashType = {
  id: string
  distnation: string
  access_token: string
}

export type ThreadTrashResType = {
  data: ThreadResType | null
  error: string | null
}

export type ThreadReplyType = {
  access_token: string
  distnation: string
  encodedMessages: EncodedMessagesType[]
}

export type ThreadReplyRes = {
  data: MessageType | null
  error: string | null
}

export type ThreadModifyGroupType = {
  access_token: string
  distnation: string
  threadIds: string[]
  actionType: string
}

export type ThreadModifyGroupRes = {
  id: string
  threadId: string
  labelIds: string[]
}

export type ThreadCreateHandlerType = {
  access_token: string
  distnation: string
  encodedMessages: EncodedMessagesType[]
}
