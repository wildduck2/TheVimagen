/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const DashboardIndexLazyImport = createFileRoute('/dashboard/')()
const DashboardHomeLazyImport = createFileRoute('/dashboard/Home')()
const DashboardFileLazyImport = createFileRoute('/dashboard/File')()
const AuthSignupLazyImport = createFileRoute('/auth/signup')()
const AuthSigninLazyImport = createFileRoute('/auth/signin')()
const AuthOtpVerificationStepLazyImport = createFileRoute(
  '/auth/otp-verification-step',
)()
const AuthForgetPasswordLazyImport = createFileRoute('/auth/forget-password')()
const AuthCompleteForgetPasswordLazyImport = createFileRoute(
  '/auth/complete-forget-password',
)()
const AuthCompleteAccountInformationLazyImport = createFileRoute(
  '/auth/complete-account-information',
)()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardIndexLazyRoute = DashboardIndexLazyImport.update({
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/dashboard/index.lazy').then((d) => d.Route),
)

const DashboardHomeLazyRoute = DashboardHomeLazyImport.update({
  path: '/dashboard/Home',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/dashboard/Home.lazy').then((d) => d.Route),
)

const DashboardFileLazyRoute = DashboardFileLazyImport.update({
  path: '/dashboard/File',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/dashboard/File.lazy').then((d) => d.Route),
)

const AuthSignupLazyRoute = AuthSignupLazyImport.update({
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/signup.lazy').then((d) => d.Route))

const AuthSigninLazyRoute = AuthSigninLazyImport.update({
  path: '/auth/signin',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/signin.lazy').then((d) => d.Route))

const AuthOtpVerificationStepLazyRoute =
  AuthOtpVerificationStepLazyImport.update({
    path: '/auth/otp-verification-step',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/auth/otp-verification-step.lazy').then((d) => d.Route),
  )

const AuthForgetPasswordLazyRoute = AuthForgetPasswordLazyImport.update({
  path: '/auth/forget-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/forget-password.lazy').then((d) => d.Route),
)

const AuthCompleteForgetPasswordLazyRoute =
  AuthCompleteForgetPasswordLazyImport.update({
    path: '/auth/complete-forget-password',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/auth/complete-forget-password.lazy').then((d) => d.Route),
  )

const AuthCompleteAccountInformationLazyRoute =
  AuthCompleteAccountInformationLazyImport.update({
    path: '/auth/complete-account-information',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/auth/complete-account-information.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/complete-account-information': {
      id: '/auth/complete-account-information'
      path: '/auth/complete-account-information'
      fullPath: '/auth/complete-account-information'
      preLoaderRoute: typeof AuthCompleteAccountInformationLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/complete-forget-password': {
      id: '/auth/complete-forget-password'
      path: '/auth/complete-forget-password'
      fullPath: '/auth/complete-forget-password'
      preLoaderRoute: typeof AuthCompleteForgetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/forget-password': {
      id: '/auth/forget-password'
      path: '/auth/forget-password'
      fullPath: '/auth/forget-password'
      preLoaderRoute: typeof AuthForgetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/otp-verification-step': {
      id: '/auth/otp-verification-step'
      path: '/auth/otp-verification-step'
      fullPath: '/auth/otp-verification-step'
      preLoaderRoute: typeof AuthOtpVerificationStepLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/signin': {
      id: '/auth/signin'
      path: '/auth/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthSigninLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/File': {
      id: '/dashboard/File'
      path: '/dashboard/File'
      fullPath: '/dashboard/File'
      preLoaderRoute: typeof DashboardFileLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/Home': {
      id: '/dashboard/Home'
      path: '/dashboard/Home'
      fullPath: '/dashboard/Home'
      preLoaderRoute: typeof DashboardHomeLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AuthCompleteAccountInformationLazyRoute,
  AuthCompleteForgetPasswordLazyRoute,
  AuthForgetPasswordLazyRoute,
  AuthOtpVerificationStepLazyRoute,
  AuthSigninLazyRoute,
  AuthSignupLazyRoute,
  DashboardFileLazyRoute,
  DashboardHomeLazyRoute,
  DashboardIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth/complete-account-information",
        "/auth/complete-forget-password",
        "/auth/forget-password",
        "/auth/otp-verification-step",
        "/auth/signin",
        "/auth/signup",
        "/dashboard/File",
        "/dashboard/Home",
        "/dashboard/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/auth/complete-account-information": {
      "filePath": "auth/complete-account-information.lazy.tsx"
    },
    "/auth/complete-forget-password": {
      "filePath": "auth/complete-forget-password.lazy.tsx"
    },
    "/auth/forget-password": {
      "filePath": "auth/forget-password.lazy.tsx"
    },
    "/auth/otp-verification-step": {
      "filePath": "auth/otp-verification-step.lazy.tsx"
    },
    "/auth/signin": {
      "filePath": "auth/signin.lazy.tsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.lazy.tsx"
    },
    "/dashboard/File": {
      "filePath": "dashboard/File.lazy.tsx"
    },
    "/dashboard/Home": {
      "filePath": "dashboard/Home.lazy.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */