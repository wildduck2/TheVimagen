import { EmailHeader } from '@/components/layouts'
import { ResizablePanelGroup } from '@/components/ui'
import { get_threads, getCookie } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/email/_email')({
  component: () => {
    const layout = getCookie('react-resizable-panels:layout')
    const collapsed = getCookie('react-resizable-panels:collapsed')

    const defaultLayout = layout ? JSON.parse(layout) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined

    return (
      <>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
          }}
        >
          <EmailHeader defaultLayout={defaultLayout ? defaultLayout[0] : null} defaultCollapsed={defaultCollapsed} />
          <Outlet />
        </ResizablePanelGroup>
      </>
    )
  },
})
