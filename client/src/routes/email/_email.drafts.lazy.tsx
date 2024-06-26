import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/email/_email/drafts')({
  component: () => <div>Hello /email/_email/sent!</div>,
})
