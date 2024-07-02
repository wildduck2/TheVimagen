import { MessageType, ThreadType } from 'controllers'

export type GetIdsFromGmailAPIType = {
  access_token: string
  maxResults: number
  distnation: string
  fields: string
  labelIds: string
}
export interface FetchEachOneWithIdType
  extends Omit<GetIdsFromGmailAPIType, 'maxResults' | 'labelIds'> {
  groupOfIds: ThreadType[]
  format: string
}
