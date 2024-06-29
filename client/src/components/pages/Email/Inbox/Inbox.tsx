import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle } from '@/components/ui'
import { use_get_threads } from '@/hooks'
import { getCookie } from '@/utils'
import { useEffect } from 'react'

export const Inbox = () => {
  // const layout = getCookie('react-resizable-panels:layout')
  // const defaultLayout = layout ? JSON.parse(layout) : undefined

  // use_get_threads()
  console.log('hi')

  return (
    <>
      <EmailSideList defaultLayout={230} />
      <ResizableHandle withHandle />
      <EmailDisplay mail={[]} defaultLayout={20} />
    </>
  )
}
