import { EmailDisplay, EmailSideList } from '@/components/layouts'
import { ResizableHandle } from '@/components/ui'
import { use_get_threads_res } from '@/hooks/use_get_threads'
import { get_threads } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const Inbox = () => {
  const query = useQuery({
    queryKey: ['threads'],
    queryFn: get_threads,
  })
  console.log(query.data?.messages)
  return (
    <>
      <EmailSideList defaultLayout={123} threads={query.data?.messages} />
      <ResizableHandle withHandle />
      <EmailDisplay defaultLayout={123} threads={query.data?.messages} />
    </>
  )
}
