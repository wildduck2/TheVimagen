import { replyThread } from '@/utils'
import { IEmail } from 'gmail-api-parse-message-ts'

export const useEmailReplyThread = () => {
  return (e: React.FormEvent<HTMLElement>, body: string, selectedThread: IEmail[]) => {
    e.preventDefault()

    replyThread({
      thread: selectedThread[0],
      htmlContent: body,
    })
  }
}
