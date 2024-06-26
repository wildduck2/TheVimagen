import { Inbox } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/email/_email/inbox')({
  component: () => <Inbox />,
})
