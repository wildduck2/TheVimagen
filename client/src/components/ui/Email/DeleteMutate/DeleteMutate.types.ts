import { IEmail } from 'gmail-api-parse-message-ts'

export type DeleteMutateProps = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}
