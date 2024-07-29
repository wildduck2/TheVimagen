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
