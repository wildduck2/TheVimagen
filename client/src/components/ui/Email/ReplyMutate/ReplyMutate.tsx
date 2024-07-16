import { Icon } from '@/assets'
import { ReplyMutateType } from './ReplyMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { EmailReplyMulti } from '@/components/layouts'

export const ReplyMutate = ({ disabled, threads, tip }: ReplyMutateType) => {
  return (
    <>
      <EmailReplyMulti
        threads={threads}
        trigger={
          <ToggleToolTipSpanWrapper
            disabled={disabled}
            tip={tip}
          >
            <Icon.reply />
          </ToggleToolTipSpanWrapper>
        }
      />
    </>
  )
}
