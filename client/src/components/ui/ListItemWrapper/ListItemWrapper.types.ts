import { MessageType } from '@/utils'
import { ReactElement } from 'react'

export type ListItemWrapperType = {
  item: MessageType
  items: MessageType[]
  children: ReactElement
}
