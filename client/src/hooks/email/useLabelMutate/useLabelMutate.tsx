import { PaginatedMessages, QueryKeyMutateType } from '@/components/ui'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UseLabelMutateProps } from './useLabelMutate.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export const UseLabelMutate = ({ threads }: UseLabelMutateProps) => {
  const { label, type } = useSelector((state: RootState) => state.email.labelModificationSelected)

  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadsIds = threads && threads.map((item) => item.threadId)

  const addLabelIds = label && type === 'add' ? [label.id] : []
  const removeLabelIds = label && label.name === 'SNOOZED' ? ['INBOX'] : type === 'remove' ? [label.id] : []

  const querykey: QueryKeyMutateType = { addLabelIds, removeLabelIds, threadIds: threadsIds }
  const startMutation = useMutation({
    mutationKey: ['Modify-Label', querykey],
    mutationFn: () => modifyThread(querykey),
    onSuccess: (updatedThreadData) => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((message) => {
              const updatedMessage = updatedThreadData.find((updatedMsg) => updatedMsg.threadId === message.threadId)
              if (updatedMessage) {
                return {
                  ...message,
                  labelIds: updatedMessage.labelIds,
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
