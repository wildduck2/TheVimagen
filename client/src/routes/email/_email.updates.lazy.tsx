import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/email/_email/updates')({
  component: () => <div>Hello /email/_email/sent!</div>,
})
