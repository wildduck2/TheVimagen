import { IEmail } from 'gmail-api-parse-message-ts'

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type LabelMutateWirelessProps = {
  threads: IEmail[]
}
