import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { modifyThread, getCookie } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ArchiveMutateType } from './ArchiveMutate.types'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'

export const ArchiveMutate = ({ disabled, threadIds, tip }: ArchiveMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['Archive-Message', { threadIds }],
    mutationFn: () => modifyThread({ threadIds }),
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
      toast.success(`Thread has been moved to Archive!`)
    },
    onError: () => {
      toast.error(`Error: Thread has not been moved to Archive!`)
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
        <Icon.archive />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
