import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { getCookie, trashMessage } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ArchiveMutateType } from './ArchiveMutate.types'
import { PaginatedMessages } from '../TrashMutate'

export const ArchiveMutate = ({ threadId, tip }: ArchiveMutateType) => {
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
    <>
      <ToggleToolTipWrapper
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.archive />
      </ToggleToolTipWrapper>
    </>
  )
}
