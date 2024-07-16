import { IEmail } from 'gmail-api-parse-message-ts'
import { ReactElement } from 'react'

export type ListItemWrapperType = {
  items: IEmail[]
  children: ReactElement
}
