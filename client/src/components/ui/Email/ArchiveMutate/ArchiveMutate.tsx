import { Icon } from '@/assets'
import { ArchiveMutateType } from './ArchiveMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { useArchiveMutate } from '@/hooks'

export const ArchiveMutate = ({ disabled, threads, tip }: ArchiveMutateType) => {
  const { startMutation } = useArchiveMutate({ threads })

  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.archive />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
