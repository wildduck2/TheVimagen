import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/File')({
  component: () => <div>Hello /File!</div>,
})
