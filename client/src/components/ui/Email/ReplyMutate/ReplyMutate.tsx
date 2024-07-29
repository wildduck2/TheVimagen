import { Icon } from '@/assets'
import { ReplyMutateType } from './ReplyMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { EmailReplyMulti } from '@/components/layouts'

export const ReplyMutate = ({ threads }: ReplyMutateType) => {
  return (
    <>
      <EmailReplyMulti
        threads={threads}
        trigger={
          <ToggleToolTipSpanWrapper
            disabled={!threads.length}
            tip={'Reply'}
          >
            <Icon.reply />
          </ToggleToolTipSpanWrapper>
        }
      />
    </>
  )
}
