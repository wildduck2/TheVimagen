import { RootState } from '@/context'
import { replyThread } from '@/utils'
import { IEmail } from 'gmail-api-parse-message-ts'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export const useEmailReplyThread = () => {
  const replyStatus = useSelector((state: RootState) => state.email.replyStatus)

  return (e: React.FormEvent<HTMLElement>, body: string, emails: string[], selectedThread: IEmail[]) => {
    e.preventDefault()
    const emailFiltered = emails.filter((email, idx) => {
      if (!replyStatus.forward === false) {
        if (idx !== 0) {
          return email
        }
      } else {
        return email
      }
    })

    emailFiltered.length === 0 && toast.error('Please select at least one email')
    emailFiltered.length > 0 &&
      replyThread({
        replyStatus,
        thread: selectedThread[0],
        htmlContent: body,
        emails: emailFiltered,
      })
  }
}
