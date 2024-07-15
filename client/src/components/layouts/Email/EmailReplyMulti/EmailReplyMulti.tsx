import {
  Button,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Label,
  NotionMinimalTextEditorToolbarPick,
  PaginatedMessages,
  Separator,
  Switch,
  Badge,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarImage,
  HoverCard,
  AvatarFallback,
  EmailProfile,
  EmailInputSelect,
  EmailReplyActionPick,
} from '@/components/ui'
import { useRef, useState } from 'react'
import { EmailReplyMultiProps } from './EmailReplyMulti.types'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { queryClient } from '@/main'
import { cn, getCookie, MessageType } from '@/utils'
import { NotionMinimalTextEditor } from '../../Notion'
import { Icon } from '@/assets'
import { emailToolbarEditor } from '@/constants'
import { CalendarDays } from 'lucide-react'
import { emailReplyButtonOptions } from '@/constants/Email/MailData'

export const EmailReplyMulti = ({ trigger, threads }: EmailReplyMultiProps) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const oldData = queryClient.getQueryData<PaginatedMessages>(currentQueryKey)
  const fullData: MessageType[] = []

  oldData?.pages.flatMap((page) =>
    page.messages.map((message) => {
      threads.includes(message.threadId) ? fullData.push(message) : null
    }),
  )
  console.log(fullData.length)

  const editorContentRef = useRef<string | null>(null)
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <Carousel
            opts={{
              align: 'end',
            }}
            className="w-full email__reply__multi"
          >
            <CarouselContent className="email__reply__multi__content m-0">
              {fullData.map((thread, idx) => (
                <>
                  <div className="email__reply__multi__content__item">
                    <Icon.X />
                    <div className="email__reply__multi__content__item__header">
                      <h3>{thread.payload.headers.find((head) => head.name === 'Subject').value}</h3>
                      <EmailReplyActionPick thread={thread} />
                    </div>
                    <Separator />
                    <form className="email__reply__multi__content__item__form">
                      <div>
                        <span className="h-full">
                          <NotionMinimalTextEditor
                            name={thread.payload.headers
                              .find((head) => head.name === 'From')
                              .value.split(' ')[0]
                              .replace(/"/g, '')}
                            editoRef={editorContentRef}
                            onChange={() => {}}
                            valid={true}
                          />
                        </span>
                        <div>
                          <Label htmlFor="mute">
                            <Switch
                              id="mute"
                              aria-label="Mute thread"
                              disabled={false}
                            />
                            Mute this thread
                          </Label>
                          <Button
                            size="sm"
                            disabled={false}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {fullData.length > 1 && idx < fullData.length - 1 && <Separator orientation="vertical" />}
                </>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DrawerContent>
      </Drawer>
    </>
  )
}
