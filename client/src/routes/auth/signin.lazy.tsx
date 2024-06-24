import { Log } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/signin')({
  component: () => <Log type="signin" />,
})
