import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle } from '@/components/ui'

export const Inbox = () => {
  console.log('sdfsdfsdf')
  return (
    <>
      <EmailSideList defaultLayout={123} />
      <ResizableHandle withHandle />
      <EmailDisplay mail={[]} defaultLayout={123} />
    </>
  )
}
