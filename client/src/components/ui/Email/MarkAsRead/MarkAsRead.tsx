import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { archiveMessage, getCookie } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'
import { MarkAsReadMutateType } from './MarkAsRead.types'

export const MarkAsReadMutate = ({ disabled, threadId, tip }: MarkAsReadMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['MarkAsRead-Message', { threadId }],
    mutationFn: () => archiveMessage({ threadId }),
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
      toast.success(`Messages has been Archived!`)
    },
  })
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.emailOpen />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
