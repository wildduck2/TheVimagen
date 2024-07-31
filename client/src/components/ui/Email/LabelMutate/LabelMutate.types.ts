import { LabelButtonStatusType } from '@/context'
import { IEmail } from 'gmail-api-parse-message-ts'
import { AnyAction, Dispatch } from 'redux'

export type LabelType = {
  id: string
  name: string
  messageListVisibility: 'show' | 'hide'
  labelListVisibility: 'labelShow' | 'labelHide' | 'labelShowIfUnread'
  type: 'system' | 'user'
  messagesTotal: number
  messagesUnread: number
  threadsTotal: number
  threadsUnread: number
  color: {
    textColor: string
    backgroundColor: string
  }
}

export type LabelMutateContentProps = {
  threads: IEmail[]
  setOpen: () => void
  move: boolean
}

export type LabelMutateWirelessProps = {
  threads: IEmail[]
}
