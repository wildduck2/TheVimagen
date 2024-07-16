import { IEmail } from 'gmail-api-parse-message-ts'
import { ReactElement } from 'react'

export type EmailReplyMultiProps = {
  trigger: ReactElement
  threads: IEmail[]
}

export type EmailReplyMultiChildrenProps = {
  threads: IEmail[]
  trigger: ReactElement
  setState: React.Dispatch<
    React.SetStateAction<{
      drawer: boolean
      alert: boolean
    }>
  >
}

export type EmailReplyMultiChildrenStatesProps = {
  thread: IEmail
  threadsLength: number
  idx: number
  setState: React.Dispatch<
    React.SetStateAction<{
      drawer: boolean
      alert: boolean
    }>
  >
}
