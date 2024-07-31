import { RootState } from '@/context'
import { replyThread } from '@/utils'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { EmailReplyThreadProps } from './useEmailReplyThread.types'

export const useEmailReplyThread = () => {
  const replyStatus = useSelector((state: RootState) => state.email.replyStatus)

  return ({ emails, e, selectedThread, body }: EmailReplyThreadProps) => {
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
    console.log(body)

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
