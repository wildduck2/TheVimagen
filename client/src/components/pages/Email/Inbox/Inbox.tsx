import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle } from '@/components/ui'
import { get_threads, getCookie } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export const Inbox = () => {
  const layout = getCookie('react-resizable-panels:layout')
  const defaultLayout = layout ? JSON.parse(layout) : undefined

  const inboxQuery = useQuery({
    queryKey: ['inbox'],
    queryFn: () => get_threads(),
  })

  const promotionQuery = useQuery({
    queryKey: ['promotion'],
    queryFn: () => get_threads('CATEGORY_PROMOTIONS'),
  })

  const socialQuery = useQuery({
    queryKey: ['social'],
    queryFn: () => get_threads('CATEGORY_SOCIAL'),
  })

  return (
    <>
      <EmailSideList
        defaultLayout={defaultLayout ? defaultLayout[1] : null}
        inbox={inboxQuery.data?.messages}
        promotion={promotionQuery.data?.messages}
        social={socialQuery.data?.messages}
      />
      <ResizableHandle withHandle />
      <EmailDisplay
        defaultLayout={defaultLayout ? defaultLayout[2] : null}
        inbox={inboxQuery.data?.messages}
        promotion={promotionQuery.data?.messages}
        social={socialQuery.data?.messages}
      />
    </>
  )
}

// defaultLayout={defaultLayout ? defaultLayout[2] : null}
