import { MessageType, ThreadType } from 'controllers'

export type GetIdsFromGmailAPIType = {
  access_token: string
  maxResults?: number | null
  distnation: string
  fields: string
  q: string
  pageToken: string
}
export interface FetchEachOneWithIdType
  extends Omit<GetIdsFromGmailAPIType, 'maxResults' | 'q' | 'pageToken'> {
  groupOfIds: string[]
  format: string
}
