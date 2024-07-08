import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/layouts'
import { NotionFile } from '@/components/pages'

export const Route = createFileRoute('/notion/file')({
  component: () => (
    <>
      <Header />
      <NotionFile />,
    </>
  ),
})
