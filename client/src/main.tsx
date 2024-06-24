import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { ThemeProvider, Toaster, TooltipProvider } from './components/ui'

import { store } from './context/redux/store.ts'
import { routeTree } from './routeTree.gen'
import './scss/style.scss'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider delayDuration={0}>
          <Toaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
// <App />
