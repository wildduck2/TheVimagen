import { Icon } from '@/assets'
import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { ToggleMutationButtonType } from './ToggleMutationButton.types'
import { cn, starThread } from '@/utils'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export const ToggleMutationButton = ({ labelIds, threadId }: ToggleMutationButtonType) => {
  //INFO: staring thread
  const invokeArgs = !labelIds.includes('STARRED')
    ? { addLabelIds: ['STARRED'], threadId }
    : { removeLabelIds: ['STARRED'], threadId }
  const startMutation = useMutation({
    mutationKey: ['starThread'],
    mutationFn: () => starThread(invokeArgs),
    onSuccess: () => {
      toast('Messages has been starred!', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    },
  })
  const starred = labelIds.includes('STARRED')

  return (
    <ToggleToolTipWrapper
      tip={'Star'}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.classList.toggle('active')
      }}
    >
      <div className="">
        <Icon.fiStar className={cn('size-[1rem] z-50', starred && 'fill-current')} />
      </div>
    </ToggleToolTipWrapper>
  )
}
