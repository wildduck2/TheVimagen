import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { PaginatedMessages, TrashMutateType } from './TrashMutate.types'
import { getCookie, trashMessage } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ToggleToolTipSpanWrapper } from '../ToggleToolTipSpanWrapper'

export const TrashMutate = ({ disabled, threadIds, tip }: TrashMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['trash-Message', { threadIds }],
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
      toast.success(`Thread has been moved to Trash!`)
    },
    onError: () => {
      toast.error(`Error: Thread has not been moved to Trash!`)
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
      <Icon.trash2 />
    </ToggleToolTipSpanWrapper>
  )
}
