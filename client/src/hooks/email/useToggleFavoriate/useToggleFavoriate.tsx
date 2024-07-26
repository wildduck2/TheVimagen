import { PaginatedMessages } from '@/components/ui'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ToggleFavoriateType } from './useToggleFavoriate.types'

export const useToggleFavoriate = ({ threads }: ToggleFavoriateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = threads.length && threads.map((item) => item.threadId)
  const labelIds = threads.length && threads[0].labelIds.includes('STARRED')
  const invokeArgs = labelIds ? { removeLabelIds: ['STARRED'], threadIds } : { addLabelIds: ['STARRED'], threadIds }

  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => modifyThread(invokeArgs),
    onSuccess: () => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((message) => {
              if (threadIds.includes(message.threadId)) {
                return {
                  ...message,
                  labelIds: labelIds
                    ? message.labelIds.filter((labelId) => labelId !== 'STARRED')
                    : [...message.labelIds, 'STARRED'],
                }
              }
              return message
            }),
          })),
        }
      })
      toast.success(`Thread has been ${labelIds ? 'unstarred' : 'starred'}!`)
    },
    onError: () => {
      toast.error(`Error: Failed to ${labelIds ? 'unstar' : 'star'} messages`)
    },
  })

  return { startMutation, labelIds }
}
