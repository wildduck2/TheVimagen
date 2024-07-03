import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
import { EmailDisplayInboxType } from './EmailDisplayInbox.types'
import { EmailDisplayInboxItem } from '../EmailDisplayInboxItem'
import { format } from 'date-fns'

export const EmailDisplayInbox = ({ inbox }: EmailDisplayInboxType) => {
  const idx = inbox && inbox.length - 1

  return inbox && idx >= 0 ? (
    <>
      <div className="email__display__inbox">
        <div className="email__display__inbox__wrapper">
          <div className="email__display__inbox__wrapper__top">
            <Avatar>
              <AvatarImage
                alt={inbox[idx].from.name}
                src="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/Oval_3.png?t=2024-07-02T13%3A34%3A16.347Z"
              />
              <AvatarFallback>
                {inbox[idx].from.name
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{inbox[idx].from.name}</div>
              <div className="line-clamp-1 text-xs">{inbox[idx].subject}</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span>
                {inbox[idx].from.email}
              </div>
            </div>
          </div>
          {inbox[inbox.length - 1].sentDate && (
            <div className="ml-auto text-xs text-muted-foreground">{format(new Date(inbox[idx].sentDate), 'PPpp')}</div>
          )}
        </div>
        <Separator />

        <ScrollArea className="email__display__inbox__content">
          {inbox.map((item) => (
            <EmailDisplayInboxItem inbox={item} key={item.id} single={inbox.length === 1 ? true : false} />
          ))}
        </ScrollArea>
        <Separator className="mt-auto" />
        <div className="email__display__inbox__bottom">
          <form>
            <div>
              <Textarea placeholder={`Reply ${inbox[idx].from.name}...`} />
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
    </>
  ) : (
    <div className="email__display__inbox__not__found">No message selected</div>
  )
}
// return inbox ? (
// )
