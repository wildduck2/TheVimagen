import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, Toaster, TooltipProvider } from './components/ui'

import { store } from './context/redux/store.ts'
import { routeTree } from './routeTree.gen'
import './scss/style.scss'

export const router = createRouter({ routeTree })
export const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
        >
          <TooltipProvider delayDuration={0}>
            <Toaster />
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </>,
)
