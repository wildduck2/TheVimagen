import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { modifyThread, getCookie } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { PaginatedMessages } from '../TrashMutate'
import { QueryKeyMutateType, ToggleToolTipSpanWrapper } from '../..'
import { MarkAsReadMutateType } from './MarkAsRead.types'

export const MarkAsReadMutate = ({ disabled, threads, tip, marktype }: MarkAsReadMutateType) => {
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
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        {marktype === 'READ' ? <Icon.emailOpen /> : <Icon.mail />}
      </ToggleToolTipSpanWrapper>
    </>
  )
}
