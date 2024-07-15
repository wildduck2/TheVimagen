import { Icon } from '@/assets'
import { Button, EmailInputSelect, NotionMinimalTextEditorToolbarPick } from '@/components/ui'
import { emailReplyButtonOptions } from '@/constants/Email/MailData'
import { cn, MessageType } from '@/utils'

export type EmailReplyActionPickProps = {
  thread: MessageType
}

export const EmailReplyActionPick = ({ thread }: EmailReplyActionPickProps) => {
  return (
    <>
      <div>
        <NotionMinimalTextEditorToolbarPick
          trigger={
            <Button
              variant="outline"
              className="flex justify-between"
            >
              <Icon.reply />
              <Icon.chovrenDown />
            </Button>
          }
          content={
            <>
              {emailReplyButtonOptions.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className={cn('notion__minimal__text__editor__toolbar__pick__content__button', idx === 0 && 'active')}
                  onClick={() => {}}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Button>
              ))}
            </>
          }
        />
        <EmailInputSelect email={thread.payload.headers.find((head) => head.name === 'Reply-To').value} />
      </div>
    </>
  )
}
