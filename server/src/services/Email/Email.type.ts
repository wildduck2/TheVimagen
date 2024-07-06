import { ThreadResType } from 'controllers'

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

export type ThreadModifyResType = ThreadResType
