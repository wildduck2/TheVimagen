import { Icon } from '@/assets'
import { ToggleToolTipSpanWrapper } from '../..'
import { DeleteMutateProps } from './DeleteMutate.types'
import { useDeleteMutate } from '@/hooks'

export const DeleteMutate = ({ disabled, threads, tip }: DeleteMutateProps) => {
  const { startMutation } = useDeleteMutate({ threads })

  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.X />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
