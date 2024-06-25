import { RequireAuth, SignupEmailSetup2 } from '@/components/layouts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/otp-verification-step')({
  component: () => (
    <RequireAuth>
      <SignupEmailSetup2 />
    </RequireAuth>
  ),
})
