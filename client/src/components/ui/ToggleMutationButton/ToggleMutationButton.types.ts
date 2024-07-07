import { Icon, IconType } from '@/assets'
import { ReactElement } from 'react'

export type ToggleMutationButtonType = {
  labelIds: string[]
  threadId: string
  icon: ({ className }: IconType) => ReactElement
  tip: string
}
