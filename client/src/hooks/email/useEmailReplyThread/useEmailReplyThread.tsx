import { RootState } from '@/context'
import { replyThread } from '@/utils'
import { IEmail } from 'gmail-api-parse-message-ts'
import { useSelector } from 'react-redux'

export const useEmailReplyThread = () => {
  const replyStatus = useSelector((state: RootState) => state.email.replyStatus)
  return (e: React.FormEvent<HTMLElement>, body: string, emails: string[], selectedThread: IEmail[]) => {
    e.preventDefault()

    replyThread({
      replyStatus,
      thread: selectedThread[0],
      htmlContent: body,
      emails,
    })
  }
}
