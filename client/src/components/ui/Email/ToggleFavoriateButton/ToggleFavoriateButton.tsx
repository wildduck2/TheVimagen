import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { PaginatedMessages, ToggleToolTipSpanWrapper } from '@/components/ui'
import { queryClient } from '@/main'
import { cn, getCookie, starThread } from '@/utils'
import { Icon } from '@/assets'
import { ToggleFavoriateButtonType } from './ToggleFavoriateButton.types'
import { useState } from 'react'

export const ToggleFavoriateButton = ({ disabled, labelIds, threadIds, tip }: ToggleFavoriateButtonType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const [alreadyStarred, setAlreadyStarred] = useState<boolean>(labelIds.includes('STARRED'))

  //INFO: starting thread
  const invokeArgs = alreadyStarred
    ? { removeLabelIds: ['STARRED'], threadIds }
    : { addLabelIds: ['STARRED'], threadIds }

  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => starThread(invokeArgs),
    onSuccess: () => {
      setAlreadyStarred(!alreadyStarred)
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
                  labelIds: alreadyStarred
                    ? message.labelIds.filter((labelId) => labelId !== 'STARRED')
                    : [...message.labelIds, 'STARRED'],
                }
              }
              return message
            }),
          })),
        }
      })
      toast.success(`Messages have been ${alreadyStarred ? 'unstarred' : 'starred'}!`)
    },
    onError: () => {
      toast.error(`Failed to ${alreadyStarred ? 'unstar' : 'star'} messages`)
    },
  })

  return (
    <ToggleToolTipSpanWrapper
      disabled={disabled}
      tip={tip}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.children[0].classList.toggle('active')
      }}
    >
      <Icon.fiStar className={cn('size-[1rem]', (labelIds.includes('STARRED') || alreadyStarred) && 'active')} />
    </ToggleToolTipSpanWrapper>
  )
}
