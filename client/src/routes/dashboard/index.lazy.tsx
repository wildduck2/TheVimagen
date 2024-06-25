import { Header, RequireAuth } from '@/components/layouts'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/')({
  component: () => (
    <>
      <RequireAuth>
        <Header />
      </RequireAuth>
      <Outlet />
    </>
  ),
})
