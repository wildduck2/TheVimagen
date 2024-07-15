import { IEmail } from 'gmail-api-parse-message-ts'
import { ReactElement } from 'react'

export type EmailReplyMultiProps = {
  trigger: ReactElement
  threads: IEmail[]
}
