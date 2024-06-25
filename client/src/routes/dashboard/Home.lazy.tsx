import { Header, RequireAuth } from '@/components/layouts'
import { Home } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/Home')({
  component: () => (
    <>
      <Home />
    </>
  ),
})
