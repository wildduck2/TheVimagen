import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/File')({
  component: () => <div>Hello /File!</div>,
})
