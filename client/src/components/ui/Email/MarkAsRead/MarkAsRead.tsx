import { Icon } from '@/assets'
import { ToggleToolTipSpanWrapper } from '../..'
import { MarkAsReadMutateType } from './MarkAsRead.types'
import { useMarkAsRead } from '@/hooks'

export const MarkAsReadMutate = ({ disabled, threads, tip, marktype }: MarkAsReadMutateType) => {
  const { startMutation } = useMarkAsRead({ marktype, threads })
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        {marktype === 'READ' ? <Icon.emailOpen /> : <Icon.mail />}
      </ToggleToolTipSpanWrapper>
    </>
  )
}
