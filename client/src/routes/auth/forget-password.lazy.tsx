import { Log } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/forget-password')({
  component: () => <Log type="forgetpasswrod" />,
})
