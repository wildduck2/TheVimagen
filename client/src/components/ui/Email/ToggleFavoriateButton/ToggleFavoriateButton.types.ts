import { IEmail } from 'gmail-api-parse-message-ts'

export type ToggleFavoriateButtonType = {
  threads: IEmail[]
  tip: string
  disabled?: boolean
}
