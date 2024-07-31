import { PaginatedMessages, QueryKeyMutateType } from '@/components/ui'
import { getSelectedEmailDispatch } from '@/context'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { UseJunkMutateProps } from './useJunkMutate.types'

export const useJunkMutate = ({ threads }: UseJunkMutateProps) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = threads && threads.map((item) => item.threadId)
  const dispatch = useDispatch()

  const querykey: QueryKeyMutateType = { addLabelIds: ['SPAM'], removeLabelIds: ['INBOX'], threadIds }
  const startMutation = useMutation({
    mutationKey: ['Junk-Message', querykey],
    mutationFn: () => modifyThread(querykey),
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
      toast.success(`Thread has been moved to Junk!`)
      dispatch(getSelectedEmailDispatch([]))
    },
    onError: () => {
      toast.error(`Error: Thread has not been moved to Junk!`)
    },
  })

  return { startMutation, threadIds }
}
