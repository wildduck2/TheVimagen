import { EmailDisplayInboxType } from './EmailDisplayInbox.types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
  ScrollArea,
  Separator,
  Switch,
  Textarea,
} from '@/components/ui'
import { format } from 'date-fns'
import { useRef } from 'react'

export const EmailDisplayInbox = ({ inbox }: EmailDisplayInboxType) => {
  //NOTE: removing the sepcial cahrs
  const emailText = inbox && inbox.textHtml.replace(`<[^>]+?>([^<]*)</[^>]+?>|([^<]*)/g`, '$1 $2'.replace(/\s+/g, ' '))
  console.log(emailText)
  const messageRef = useRef()

  inbox && (messageRef!.innerHTML = emailText)

  return inbox ? (
    <div className="email__display__inbox">
      <div className="email__display__inbox__wrapper">
        <div className="email__display__inbox__wrapper__top">
          <Avatar>
            <AvatarImage
              alt={inbox.from.name}
              src="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/Oval_3.png?t=2024-07-02T13%3A34%3A16.347Z"
            />
            <AvatarFallback>
              {inbox.from.name
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{inbox.from.name}</div>
            <div className="line-clamp-1 text-xs">{inbox.subject}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Reply-To:</span> {inbox.from.email}
            </div>
          </div>
        </div>
        {inbox.sentDate && (
          <div className="ml-auto text-xs text-muted-foreground">{format(new Date(inbox.sentDate), 'PPpp')}</div>
        )}
      </div>
      <Separator />
      <ScrollArea className="email__display__inbox__content">
        {
          // <div dangerouslySetInnerHTML={{ __html: emailText! }} />
          <iframe
            srcDoc={`<style>* {  scrollbar-width: thin;}</style>${emailText}`}
            className="w-full h-[61.88vh] overflow-hidden"
            color="red"
            style={{ overflowY: 'hidden' }}
          />
        }
      </ScrollArea>
      <Separator className="mt-auto" />
      <div className="email__display__inbox__bottom">
        <form>
          <div>
            <Textarea placeholder={`Reply ${inbox.from.name}...`} />
            <div>
              <Label htmlFor="mute">
                <Switch id="mute" aria-label="Mute thread" /> Mute this thread
              </Label>
              <Button size="sm">Send</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="email__display__inbox__not__found">No message selected</div>
  )
}
