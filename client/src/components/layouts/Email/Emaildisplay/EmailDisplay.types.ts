import { MessageType } from '@/utils'

export interface EmailDisplayProps {
  inbox: MessageType[] | undefined
  promotion: MessageType[] | undefined
  social: MessageType[] | undefined
  defaultLayout: number
}
