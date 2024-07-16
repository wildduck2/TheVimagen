import { Icon } from '@/assets'
import {
  Button,
  EmailInputSelect,
  NotionMinimalTextEditorToolbarPick,
  ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { emailReplyButtonOptions } from '@/constants/Email/MailData'
import { cn } from '@/utils'
import { EmailReplyActionPickProps } from './EmailReplyActionPick.types'

export const EmailReplyActionPick = ({ thread, currentState, onClick }: EmailReplyActionPickProps) => {
  return (
    <>
      <div>
        <NotionMinimalTextEditorToolbarPick
          trigger={
            <ToggleToolTipButtonWrapper
              variant="outline"
              tip={currentState.label}
              children={
                <>
                  <currentState.icon />
                  <Icon.chovrenDown />
                </>
              }
            />
          }
          content={
            <>
              {emailReplyButtonOptions.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className={cn(
                    'notion__minimal__text__editor__toolbar__pick__content__button',
                    item.label === currentState.label && 'active',
                  )}
                  onClick={() => onClick({ label: item.label, icon: item.icon })}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Button>
              ))}
            </>
          }
        />
        <EmailInputSelect email={thread.from.email} />
      </div>
    </>
  )
}
