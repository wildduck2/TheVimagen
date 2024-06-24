import { RequireAuth } from '@/components/layouts'
import { CompleteForgetPassword } from '@/components/layouts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/complete-forget-password')({
  component: () => <CompleteForgetPassword />,
})
