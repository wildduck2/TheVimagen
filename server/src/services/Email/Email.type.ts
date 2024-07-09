import { MessageType, ThreadResType } from 'controllers'

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

export type ThreadModifyType = {
  distnation: string
  access_token: string
  addLabelIds: string[]
  removeLabelIds: string[]
}

export type ThreadModifyResType = {
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
  threadId: string
  to: string
  subject: string
  inReplyTo: string
  body: string
}

export type ThreadReplyRes = {
  data: MessageType | null
  error: string | null
}
