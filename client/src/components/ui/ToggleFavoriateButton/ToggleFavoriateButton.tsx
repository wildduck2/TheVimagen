import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { ToggleFavoriateButtonType } from './ToggleFavoriateButton.types'
import { cn, MessageType, starThread, ThreadMessageType, ThreadsType } from '@/utils'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { useState } from 'react'

export const ToggleFavoriateButton = ({ labelIds, threadId, tip }: ToggleFavoriateButtonType) => {
  const [alreadyStarred, setAlreadyStarred] = useState(labelIds.includes('STARRED'))

  //INFO: staring thread
  const invokeArgs = !alreadyStarred
    ? { addLabelIds: ['STARRED'], threadId }
    : { removeLabelIds: ['STARRED'], threadId }

  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => starThread(invokeArgs),
    onSuccess: () => {
      setAlreadyStarred(!alreadyStarred) // Toggle the local state
      toast.success(`Messages has been ${!alreadyStarred ? 'starred' : 'unstarred'}!`, {})
    },
    onError: () => {
      toast.error(`Messages has been not Starred`)
    },
  })

  return (
    <ToggleToolTipWrapper
      tip={tip}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.children[0].classList.toggle('active')
      }}
    >
      <Icon.fiStar className={cn('size-[1rem]', alreadyStarred && 'active')} />
    </ToggleToolTipWrapper>
  )
}
