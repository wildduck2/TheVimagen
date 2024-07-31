import { EmailDisplay } from '@/components/layouts'
import { ResizablePanelGroup } from '@/components/ui'
import { getCookie } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email/popup')({
  component: () => {
    const layout = getCookie('react-resizable-panels:layout')
    const defaultLayout = layout ? JSON.parse(layout) : undefined

    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
      >
        <EmailDisplay defaultLayout={defaultLayout ? defaultLayout[2] : null} />
      </ResizablePanelGroup>
    )
  },
})
