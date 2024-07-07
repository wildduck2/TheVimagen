import { MessageType } from '@/utils'
import { ReactElement } from 'react'

export type ListItemWrapperType = {
  item: MessageType
  ids: string[]
  children: ReactElement
  icon: ReactElement
}
