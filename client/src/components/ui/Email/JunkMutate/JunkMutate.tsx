import { Icon } from '@/assets'
import { JunkMutateType } from './JunkMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { useJunkMutate } from '@/hooks'

export const JunkMutate = ({ threads }: JunkMutateType) => {
  const { startMutation } = useJunkMutate({ threads })
  return (
    <ToggleToolTipSpanWrapper
      disabled={!threads.length}
      tip={'Junk'}
      onClick={() => {
        startMutation.mutate()
      }}
    >
      <Icon.archiveX />
    </ToggleToolTipSpanWrapper>
  )
}
