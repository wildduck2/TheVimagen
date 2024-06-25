import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/_dashboard/Files')({
  component: () => <div>Hello /File!</div>,
})
