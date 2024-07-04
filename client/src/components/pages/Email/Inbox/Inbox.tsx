import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle } from '@/components/ui'
import { getCookie } from '@/utils'

export const Inbox = () => {
  const layout = getCookie('react-resizable-panels:layout')
  const defaultLayout = layout ? JSON.parse(layout) : undefined

  return (
    <>
      <EmailSideList defaultLayout={defaultLayout ? defaultLayout[1] : null} />
      <ResizableHandle withHandle />
      <EmailDisplay defaultLayout={defaultLayout ? defaultLayout[2] : null} />
    </>
  )
}
