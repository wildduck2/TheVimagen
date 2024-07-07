import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { ToggleMutationButtonType } from './ToggleMutationButton.types'
import { cn, starThread } from '@/utils'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export const ToggleMutationButton = ({ labelIds, threadId, icon, tip }: ToggleMutationButtonType) => {
  const alreadyStarred = labelIds.includes('STARRED')

  //INFO: staring thread
  const invokeArgs = !alreadyStarred
    ? { addLabelIds: ['STARRED'], threadId }
    : { removeLabelIds: ['STARRED'], threadId }

  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => starThread(invokeArgs),
    onSettled: () => {
      toast.success(`Messages has been ${alreadyStarred ? 'starred' : 'unstarred'}!`, {})
    },
  })

  return (
    <ToggleToolTipWrapper
      tip={tip}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.classList.toggle('active')
      }}
    >
      {icon({ className: cn('size-[1rem]', alreadyStarred && 'active') })}
    </ToggleToolTipWrapper>
  )
}
