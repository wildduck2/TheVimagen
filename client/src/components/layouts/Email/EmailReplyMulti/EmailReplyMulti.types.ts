import { IEmail } from 'gmail-api-parse-message-ts'
import { ReactElement } from 'react'

export type EmailReplyMultiProps = {
  trigger: ReactElement
  threads: IEmail[]
}

export type EmailReplyMultiChildrenProps = {
  threads: IEmail[]
  trigger: ReactElement
}

export type EmailReplyMultiChildrenStatesProps = {
  thread: IEmail
  threadsLength: number
  idx: number
}
