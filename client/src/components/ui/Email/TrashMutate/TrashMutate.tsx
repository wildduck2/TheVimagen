import { TrashMutateType } from './TrashMutate.types'
import { Icon } from '@/assets'
import { ToggleToolTipSpanWrapper } from '../ToggleToolTipSpanWrapper'
import { useTrashMutate } from '@/hooks'

export const TrashMutate = ({ disabled, threads, tip }: TrashMutateType) => {
  const { startMutation } = useTrashMutate({ threads })

  return (
    <ToggleToolTipSpanWrapper
      disabled={disabled}
      tip={tip}
      onClick={() => {
        startMutation.mutate()
      }}
    >
      <Icon.trash2 />
    </ToggleToolTipSpanWrapper>
  )
}
