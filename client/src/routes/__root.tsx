import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  // <TanStackRouterDevtools position="bottom-right" />
  component: () => (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <ScrollRestoration />
      <Outlet />
    </>
  ),
})
