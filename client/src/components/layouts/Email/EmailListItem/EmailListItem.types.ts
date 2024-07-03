import { MessageType } from '@/utils'

export type EmailListItemType = {
  item: MessageType
  items?: MessageType[] | null
}
