import { TrashMutateType } from './TrashMutate.types'
import { Icon } from '@/assets'
import { ToggleToolTipSpanWrapper } from '../ToggleToolTipSpanWrapper'
import { useTrashMutate } from '@/hooks'

export const TrashMutate = ({ threads }: TrashMutateType) => {
  const { startMutation } = useTrashMutate({ threads })

  return (
    <ToggleToolTipSpanWrapper
      disabled={!threads.length}
      tip={'Move to Trash'}
      onClick={() => {
        startMutation.mutate()
      }}
    >
      <Icon.trash2 />
    </ToggleToolTipSpanWrapper>
  )
}
