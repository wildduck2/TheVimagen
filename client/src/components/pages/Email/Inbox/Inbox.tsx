import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle, ResizablePanel } from '@/components/ui'
import { InboxType } from './Inbox.types'
import { getCookie } from '@/utils'

//FIX: remove this dumby data
import { mails } from '@/constants/Email/MailData'
import { useMail } from '../useEmail'

export const Inbox = () => {
  const [mail] = useMail()

  const layout = getCookie('react-resizable-panels:layout')

  const defaultLayout = layout ? JSON.parse(layout) : undefined

  console.log(defaultLayout)
  return (
    <>
      <EmailSideList defaultLayout={defaultLayout ? defaultLayout[1] : null} />
      <ResizableHandle withHandle />
      <EmailDisplay
        mail={mails.find((item) => item.id === mail.selected) || null}
        defaultLayout={defaultLayout ? defaultLayout[2] : null}
      />
    </>
  )
}
