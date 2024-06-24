import { CompleteAccountInformation, RequireAuth } from '@/components/layouts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/complete-account-information')({
    component: () => (
        <RequireAuth>
            <CompleteAccountInformation />,
        </RequireAuth>
    ),
})
