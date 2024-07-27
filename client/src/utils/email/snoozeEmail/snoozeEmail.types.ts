import { IEmail } from 'gmail-api-parse-message-ts'

export type SnoozeEmailType = {
  date: Date
  threads: IEmail[]
}
