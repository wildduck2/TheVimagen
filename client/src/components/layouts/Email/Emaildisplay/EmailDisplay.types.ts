import { MessageType } from '@/utils'

export interface EmailDisplayProps {
  threads: MessageType[] | undefined
  defaultLayout: number
}
