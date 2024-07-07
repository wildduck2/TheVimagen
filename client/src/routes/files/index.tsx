import { Files } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/')({
  component: () => <Files />,
})
