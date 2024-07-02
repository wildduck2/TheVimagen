import { MessageType } from '@/utils'

export type EmailSideListType = {
  inbox: MessageType[] | undefined
  promotion: MessageType[] | undefined
  social: MessageType[] | undefined
  defaultLayout: number
}
