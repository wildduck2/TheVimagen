import { Inbox } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email/_email/inbox')({
  component: () => {
    // gcc;<Inbox />
    console.log('sdfuckls')
    return <h1>kljfskldf</h1>
  },
})
