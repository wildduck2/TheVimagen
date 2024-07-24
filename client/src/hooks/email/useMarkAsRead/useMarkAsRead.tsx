import { PaginatedMessages, QueryKeyMutateType } from '@/components/ui'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UseMarkAsReadProps } from './useMarkAsRead.types'

export const useMarkAsRead = ({ marktype, threads }: UseMarkAsReadProps) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = threads && threads.map((item) => item.threadId)

  const querykey: QueryKeyMutateType =
    marktype === 'READ'
      ? { addLabelIds: [], removeLabelIds: ['UNREAD'], threadIds }
      : { addLabelIds: ['UNREAD'], removeLabelIds: [], threadIds }

  const startMutation = useMutation({
    mutationKey: ['MarkAsRead-Message', querykey],
    mutationFn: () => modifyThread(querykey),
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
                  labelIds: message.labelIds.includes('UNREAD')
                    ? message.labelIds.filter((labelId) => labelId !== 'UNREAD')
                    : [...message.labelIds, 'UNREAD'],
                }
              }
              return message
            }),
          })),
        }
      })
      toast.success(`Thread has been marked as ${marktype !== 'READ' ? 'unread' : 'read'}!`)
    },
    onError: () => {
      toast.error(`Error: Thread has not been marked as ${marktype !== 'READ' ? 'unread' : 'read'}!`)
    },
  })
  console.log(startMutation.status)

  return { startMutation }
}
