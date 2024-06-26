import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email/_email/')({
  component: () => <div>Hello /email/_email/!</div>,
})
