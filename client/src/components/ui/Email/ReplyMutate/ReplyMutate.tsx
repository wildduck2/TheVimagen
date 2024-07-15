import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { modifyThread, getCookie } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ReplyMutateType } from './ReplyMutate.types'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'
import { EmailReplyMulti } from '@/components/layouts'

export const ReplyMutate = ({ disabled, threadIds, tip }: ReplyMutateType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const startMutation = useMutation({
    mutationKey: ['Reply-Message', { threadIds }],
    mutationFn: () => modifyThread({ threadIds }),
    onSuccess: () => {
      // queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
      //   if (!oldData) return { pages: [], pageParams: [] }
      //   return {
      //     ...oldData,
      //     pages: oldData.pages.map((page) => ({
      //       ...page,
      //       messages: page.messages.filter((message) => message.threadId !== threadId),
      //     })),
      //   }
      // })
      toast.success(`Thread has been Replied!`)
    },
    onError: () => {
      toast.error(`ERROR: Thread has not been Replied!`)
    },
  })
  return (
    <>
      <EmailReplyMulti
        threads={threadIds}
        trigger={
          <ToggleToolTipSpanWrapper
            disabled={disabled}
            tip={tip}
            onClick={() => {
              // startMutation.mutate()
            }}
          >
            <Icon.reply />
          </ToggleToolTipSpanWrapper>
        }
      />
    </>
  )
}
