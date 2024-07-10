import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { PaginatedMessages, TrashMutateType } from './TrashMutate.types'
import { getCookie, trashMessage } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ToggleToolTipSpanWrapper } from '../ToggleToolTipSpanWrapper'

export const TrashMutate = ({ threadId, tip }: TrashMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['trash-Message', { threadId }],
    mutationFn: () => trashMessage({ threadId }),
    onSuccess: () => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.filter((message) => message.threadId !== threadId),
          })),
        }
      })
      toast.success(`Messages has been Deleted!`)
    },
  })

  return (
    <ToggleToolTipSpanWrapper
      tip={tip}
      onClick={() => {
        startMutation.mutate()
      }}
    >
      <Icon.trash2 />
    </ToggleToolTipSpanWrapper>
  )
}
