import { IAttachment, IEmail } from 'gmail-api-parse-message-ts'

export type EmailReplyAttachmentButtonProps = {
  thread: IEmail
  files: IAttachment[]
}
