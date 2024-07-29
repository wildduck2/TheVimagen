import { Icon } from '@/assets'
import { ArchiveMutateType } from './ArchiveMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { useArchiveMutate } from '@/hooks'

export const ArchiveMutate = ({ threads }: ArchiveMutateType) => {
  const { startMutation } = useArchiveMutate({ threads })

  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={!threads.length}
        tip={'Archive'}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.archive />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
