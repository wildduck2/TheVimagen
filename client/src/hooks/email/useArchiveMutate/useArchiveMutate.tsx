import { PaginatedMessages } from '@/components/ui'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { UseArchiveMutateType } from './useArchiveMutate.types'
import { setSelectedThreadsDispatch } from '@/context'

export const useArchiveMutate = ({ threads }: UseArchiveMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = threads && threads.map((item) => item.threadId)
  const dispatch = useDispatch()

  const startMutation = useMutation({
    mutationKey: ['Archive-Message', { threadIds }],
    mutationFn: () => modifyThread({ threadIds }),
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
      toast.success(`Thread has been moved to Archive!`)
      dispatch(setSelectedThreadsDispatch([]))
    },
    onError: () => {
      toast.error(`Error: Thread has not been moved to Archive!`)
    },
  })

  return { startMutation }
}
