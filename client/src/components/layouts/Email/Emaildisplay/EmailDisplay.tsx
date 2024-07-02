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

export const emailDisplayButtonData = ['Archive', 'Move to junk', 'Move to trash']

export function EmailDisplay({ inbox, promotion, defaultLayout = 37 }: EmailDisplayProps) {
  return (
    <ResizablePanel order={2} defaultSize={defaultLayout} minSize={30}>
      <div className="flex h-full flex-col">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.archiveX className="h-4 w-4" />
                  <span className="sr-only">Move to junk</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to junk</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <EmailSnoozeButton />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.reply className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.replyAll className="h-4 w-4" />
                  <span className="sr-only">Reply all</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply all</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!inbox}>
                  <Icon.forward className="h-4 w-4" />
                  <span className="sr-only">Forward</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Forward</TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!inbox}>
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
        {inbox ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage alt={inbox.name} />
                  <AvatarFallback>
                    {
                      inbox.name
                      // .split(' ')
                      // .map((chunk) => chunk[0])
                      // .join('')
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">{inbox.name}</div>
                  <div className="line-clamp-1 text-xs">{inbox.subject}</div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Reply-To:</span> {inbox.email}
                  </div>
                </div>
              </div>
              {inbox.date && (
                <div className="ml-auto text-xs text-muted-foreground">{format(new Date(inbox.date), 'PPpp')}</div>
              )}
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{inbox.text}</div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <form>
                <div className="grid gap-4">
                  <Textarea className="p-4" placeholder={`Reply ${inbox.name}...`} />
                  <div className="flex items-center">
                    <Label htmlFor="mute" className="flex items-center gap-2 text-xs font-normal">
                      <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                    </Label>
                    <Button size="sm" className="ml-auto">
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">No message selected</div>
        )}
      </div>
    </ResizablePanel>
  )
}
