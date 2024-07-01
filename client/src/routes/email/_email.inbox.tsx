import { Inbox } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email/_email/inbox')({
  component: () => <Inbox />,
})
