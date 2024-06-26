import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/email/_email/all-email')({
  component: () => <div>Hello /email/_email/sent!</div>,
})
