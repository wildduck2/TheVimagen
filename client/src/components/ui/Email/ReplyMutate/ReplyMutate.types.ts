import { IEmail } from 'gmail-api-parse-message-ts'

export type ReplyMutateType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}
