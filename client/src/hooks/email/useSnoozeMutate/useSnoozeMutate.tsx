import { PaginatedMessages } from '@/components/ui'
import { setSelectedThreadsDispatch } from '@/context'
import { queryClient } from '@/main'
import { getCookie, snoozeEmail } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { UseSnoozeMutateType } from './useSnoozeMutate.types'

export const useSnoozeMutate = ({ selectedThreads: selectedThread }: UseSnoozeMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = selectedThread.map((item) => item.threadId)

  const [date, setDate] = useState<Date | undefined>(new Date())
  const dispatch = useDispatch()
  const startMutation = useMutation({
    mutationKey: ['snoozeEmail'],
    mutationFn: () => snoozeEmail({ date, threads: selectedThread }),
    onSuccess: () => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.filter((message) => !threadIds.includes(message.threadId)),
          })),
        }
      })

      toast.success('Thread is snoozed successfully')
      dispatch(setSelectedThreadsDispatch([]))
    },
    onError: () => {
      toast.error('Thread is not snoozed')
    },
  })
  return { startMutation, threadIds, dispatch, setDate, date }
}
