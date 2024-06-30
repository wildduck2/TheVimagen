import { Log } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signin')({
  component: () => <Log type="signin" />,
})
