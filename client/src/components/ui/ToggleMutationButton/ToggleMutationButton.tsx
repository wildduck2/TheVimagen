import { Icon } from '@/assets'
import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { ToggleMutationButtonType } from './ToggleMutationButton.types'
import { cn, starThread } from '@/utils'
import { toast } from 'sonner'
import { Mutation, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export const ToggleMutationButton = ({ labelIds, threadId }: ToggleMutationButtonType) => {
  const alreadyStarred = labelIds.includes('STARRED')
  const [starred, setStarred] = useState<boolean>(alreadyStarred)

  //INFO: staring thread
  const invokeArgs = !alreadyStarred
    ? { addLabelIds: ['STARRED'], threadId }
    : { removeLabelIds: ['STARRED'], threadId }

  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => starThread(invokeArgs),
    onSettled: () => {
      toast.success(`Messages has been ${starred ? 'starred' : 'unstarred'}!`, {})
    },
  })

  return (
    <ToggleToolTipWrapper
      tip={'Star'}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.classList.toggle('fill-current')
        setStarred(!starred)
      }}
    >
      <div className="">
        <Icon.fiStar className={cn('size-[1rem] z-50', starred ? 'fill-current' : '')} />
      </div>
    </ToggleToolTipWrapper>
    // <Icon.fiStar className={cn('size-[1rem] z-50')} />
  )
}
