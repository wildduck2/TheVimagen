import { Icon } from '@/assets'
import { ToggleToolTipSpanWrapper } from '../..'
import { MarkAsReadMutateType } from './MarkAsRead.types'
import { useMarkAsRead } from '@/hooks'

export const MarkAsReadMutate = ({ threads, marktype }: MarkAsReadMutateType) => {
  const { startMutation } = useMarkAsRead({ marktype, threads })
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={!threads.length}
        tip={marktype === 'READ' ? 'Mark as Unread' : 'Mark as Read'}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        {marktype === 'READ' ? <Icon.emailOpen /> : <Icon.mail />}
      </ToggleToolTipSpanWrapper>
    </>
  )
}
