import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/email/_email/sent')({
  component: () => <div>Hello /email/_email/sent!</div>,
})
