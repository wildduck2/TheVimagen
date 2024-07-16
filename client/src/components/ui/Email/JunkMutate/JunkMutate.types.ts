import { IEmail } from 'gmail-api-parse-message-ts'

export type JunkMutateType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}
