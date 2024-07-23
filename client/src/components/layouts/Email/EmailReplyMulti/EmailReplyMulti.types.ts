import { IEmail } from 'gmail-api-parse-message-ts'
import { MutableRefObject, ReactElement } from 'react'

export type EmailReplyMultiProps = {
  trigger: ReactElement
  threads: IEmail[]
}

export type SetState = React.Dispatch<
  React.SetStateAction<{
    drawer: boolean
    alert: boolean
  }>
>

export type ThreadsReplyContentRef = { threadId: string; content: string }[]

export type EmailReplyMultiChildrenProps = {
  threads: IEmail[]
  trigger: ReactElement
  setState: SetState
  threadsReplyContentRef: MutableRefObject<ThreadsReplyContentRef>
}

export type EmailReplyMultiChildrenStatesProps = {
  thread: IEmail
  threadsLength: number
  idx: number
  setState: SetState
  threadsReplyContentRef: MutableRefObject<ThreadsReplyContentRef>
}

export type EmailreplyContent = {
  reply: string | null
  editSubject: string | null
}
