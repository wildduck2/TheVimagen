import { Icon } from '@/assets'
import { ReplyMutateType } from './ReplyMutate.types'
import { ToggleToolTipSpanWrapper } from '../..'
import { EmailReplyMulti } from '@/components/layouts'

export const ReplyMutate = ({ disabled, threads, tip }: ReplyMutateType) => {
  const threadsSelected = threads.map((item) => item)

  return (
    <>
      <EmailReplyMulti
        threads={threadsSelected}
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
