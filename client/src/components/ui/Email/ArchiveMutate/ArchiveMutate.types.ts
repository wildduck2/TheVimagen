import { IEmail } from 'gmail-api-parse-message-ts'

export type ArchiveMutateType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}
