import { Home } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/dashboard/_dashboard/Home')({
  component: () => (
    <>
      <Home />
    </>
  ),
})
