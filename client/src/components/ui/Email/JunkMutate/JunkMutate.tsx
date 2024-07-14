import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie, modifyThread } from '@/utils'
import { JunkMutateType } from './JunkMutate.types'
import { PaginatedMessages } from '../TrashMutate'
import { QueryKeyMutateType, ToggleToolTipSpanWrapper } from '../..'

export const JunkMutate = ({ disabled, threadIds, tip }: JunkMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

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
    },
    onError: () => {
      toast.error(`Error: Thread has not been moved to Junk!`)
    },
  })

  return (
    <ToggleToolTipSpanWrapper
      disabled={disabled}
      tip={tip}
      onClick={() => {
        startMutation.mutate()
      }}
    >
      <Icon.archiveX />
    </ToggleToolTipSpanWrapper>
  )
}
