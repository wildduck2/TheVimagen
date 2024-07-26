import { ReactElement } from 'react'

export type EmailProfileProps = {
  trigger: ReactElement
  replyTo: string
  profileImg: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}
