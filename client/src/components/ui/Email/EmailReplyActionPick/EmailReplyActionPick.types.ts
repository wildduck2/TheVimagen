import { IconType } from '@/assets'
import { IEmail } from 'gmail-api-parse-message-ts'

export type currentStateType = { label: string; icon: ({ className }: IconType) => JSX.Element }
export type EmailReplyActionPickProps = {
  thread: IEmail
  currentState: currentStateType
  onClick: ({ label, icon }: currentStateType) => void
}
