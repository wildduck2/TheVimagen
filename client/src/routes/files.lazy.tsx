import { Files } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/files')({
  component: () => <Files />,
})
