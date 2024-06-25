import { Header } from '@/components/layouts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
})
