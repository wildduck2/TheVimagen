import { IEmail } from 'gmail-api-parse-message-ts'
import { ReactElement } from 'react'

export type EmaildispalyButtonType = {
  selectedThread: IEmail[]
  label: string
  icon: ReactElement
}
