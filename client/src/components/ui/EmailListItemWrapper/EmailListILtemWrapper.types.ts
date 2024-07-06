import { MessageType } from '@/utils'
import { ReactElement } from 'react'

export type EmailListITemWrapperType = {
  item: MessageType
  ids: string[]
  children: ReactElement
}
