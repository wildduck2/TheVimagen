import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Calendar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ResizablePanel,
  Separator,
  Switch,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'
import { EmailDisplayProps } from './EmailDisplay.types'

//FIX: should fetch data instead of this dumby data
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import format from 'date-fns/format'
import nextSaturday from 'date-fns/nextSaturday'
import { EmailSnoozeButton } from '../EmailSnoozeButton'
import { Icon } from '@/assets'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'
import { useQuery } from '@tanstack/react-query'
import { getThread } from '@/utils'
import { EmailDisplayButton } from '../EmailDisplayButton/EmailDispalyButton'
import { MutableRefObject, useEffect, useRef } from 'react'
import { IEmail, ParseGmailApi } from 'gmail-api-parse-message-ts'
import { EmailDisplayInbox } from '../EmailDisplayInbox'

export const emailDisplayButtonData = ['Archive', 'Move to junk', 'Move to trash']

export function EmailDisplay({ defaultLayout = 37 }: EmailDisplayProps) {
  const emailSelectedId = useSelector((state: RootState) => state.email.selectedEmailId)

  const { data, refetch } = useQuery<IEmail>({
    queryKey: ['emailSelectedIdMessage'],
    queryFn: () => getThread({ thread_id: emailSelectedId }),
  })

  useEffect(() => {
    emailSelectedId !== '' && refetch()
  }, [emailSelectedId])

  return (
    <ResizablePanel order={2} defaultSize={defaultLayout} minSize={30}>
      <div className="flex h-full flex-col">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Archive"
              icon={<Icon.archive className="h-4 w-4" />}
            />

            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Move to junk"
              icon={<Icon.archiveX className="h-4 w-4" />}
            />

            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Move to trash"
              icon={<Icon.trash2 className="h-4 w-4" />}
            />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <EmailSnoozeButton />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Reply"
              icon={<Icon.reply className="h-4 w-4" />}
            />

            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Reply all"
              icon={<Icon.replyAll className="h-4 w-4" />}
            />

            <EmailDisplayButton
              emailSelectedId={emailSelectedId}
              label="Forward"
              icon={<Icon.forward className="h-4 w-4" />}
            />
          </div>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={emailSelectedId === ''}>
                <Icon.moreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Mute thread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator />
        <EmailDisplayInbox inbox={data ? data : null} />
      </div>
    </ResizablePanel>
  )
}
