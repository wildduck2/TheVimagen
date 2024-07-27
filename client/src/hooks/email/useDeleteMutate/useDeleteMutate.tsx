import { getCookie, trashMessage } from '@/utils'
import { UseDeleteMutateType } from './useDeleteMutate.types'
import { getSelectedEmailDispatch } from '@/context'
import { toast } from 'sonner'
import { queryClient } from '@/main'
import { PaginatedMessages } from '@/components/ui'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMutate = ({ threads }: UseDeleteMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = threads && threads.map((item) => item.threadId)
  const dispatch = useDispatch()

  const startMutation = useMutation({
    mutationKey: ['delete-Message', { threadIds }],
    mutationFn: () => trashMessage({ threadIds }),
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
      toast.success(`Thread has been Deleted!`)
      dispatch(getSelectedEmailDispatch([]))
    },
  })

  return {
    startMutation,
  }
}
