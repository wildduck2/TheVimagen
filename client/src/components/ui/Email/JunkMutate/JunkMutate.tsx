import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { archiveMessage, getCookie, trashMessage } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { JunkMutateType } from './JunkMutate.types'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'

export const JunkMutate = ({ disabled, threadId, tip }: JunkMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['Junk-Message', { threadId }],
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
        <Icon.archiveX />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
