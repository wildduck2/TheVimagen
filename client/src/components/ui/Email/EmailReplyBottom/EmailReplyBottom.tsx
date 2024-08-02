import { EmailReplyToButton, Button, Label, Switch, EmailReplyAttachmentButton } from '@/components/ui'
import { EmailReplyBottomProps } from './EmailReplyBottom.types'

export const EmailReplyBottom = ({
  valid,
  selectedThread,
  replyToEmails,
  showReplyIcon = true,
  files = [],
}: EmailReplyBottomProps) => {
  return (
    <div className="email__reply__bottom">
      <Label htmlFor="mute">
        <Switch
          id="mute"
          aria-label="Mute thread"
          disabled={valid}
        />
        Mute this thread
      </Label>

      <div>
        {showReplyIcon &&
          (selectedThread ? (
            <EmailReplyToButton
              thread={selectedThread}
              replyToEmails={replyToEmails}
            />
          ) : (
            <div />
          ))}
        {selectedThread ? (
          <EmailReplyAttachmentButton
            files={files}
            thread={selectedThread}
          />
        ) : (
          <div />
        )}

        <Button
          size="sm"
          disabled={valid}
        >
          Send
        </Button>
      </div>
    </div>
  )
}
