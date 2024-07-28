import { PaginatedMessages, QueryKeyMutateType } from '@/components/ui'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UseLabelMutateProps } from './useLabelMutate.types'

export const UseLabelMutate = ({ threads }: UseLabelMutateProps) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadsIds = threads && threads.map((item) => item.threadId)

  const querykey: QueryKeyMutateType = { addLabelIds: [], removeLabelIds: [], threadIds: threadsIds }
  const startMutation = useMutation({
    mutationKey: ['Modify-Label', querykey],
    mutationFn: () => modifyThread(querykey),
    onSuccess: () => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((message) => {
              if (querykey.threadIds.includes(message.threadId)) {
                const newLabelIds = new Set(message.labelIds)
                querykey.addLabelIds.forEach((label) => newLabelIds.add(label))
                querykey.removeLabelIds.forEach((label) => newLabelIds.delete(label))
                return {
                  ...message,
                  labelIds: Array.from(newLabelIds),
                }
              }
              return message
            }),
          })),
        }
      })
      toast.success(`Thread has been ${querykey.addLabelIds.length > 0 ? 'modified' : 'updated'}!`)
    },
    onError: () => {
      toast.error(`Error: Failed to ${querykey.addLabelIds.length > 0 ? 'modify' : 'update'} messages`)
    },
  })

  return {
    threadsIds,
    startMutation,
  }
}
