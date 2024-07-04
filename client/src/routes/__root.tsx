import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  // <TanStackRouterDevtools position="bottom-right" />
  //     <ReactQueryDevtools initialIsOpen={false} />
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
