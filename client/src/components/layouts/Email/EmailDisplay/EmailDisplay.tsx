import { useSelector } from 'react-redux'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmailDisplayButton,
  EmailSnoozeButton,
  ResizablePanel,
  Separator,
} from '@/components/ui'
import { Icon } from '@/assets'
import { RootState } from '@/context'

import { EmailDisplayInbox } from '../EmailDisplayInbox'
import { EmailDisplayProps } from './EmailDisplay.types'

export const emailDisplayButtonData = ['Archive', 'Move to junk', 'Move to trash']

export function EmailDisplay({ defaultLayout = 37 }: EmailDisplayProps) {
  const selectedThread = useSelector((state: RootState) => state.email.selectedThread)

  return (
    <ResizablePanel
      order={2}
      defaultSize={defaultLayout}
      minSize={40}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Archive"
              icon={<Icon.archive className="h-4 w-4" />}
            />

            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Move to junk"
              icon={<Icon.archiveX className="h-4 w-4" />}
            />

            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Move to trash"
              icon={<Icon.trash2 className="h-4 w-4" />}
            />
            <Separator
              orientation="vertical"
              className="mx-1 h-6"
            />
            <EmailSnoozeButton selectedThread={selectedThread} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Reply"
              icon={<Icon.reply className="h-4 w-4" />}
            />

            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Reply all"
              icon={<Icon.replyAll className="h-4 w-4" />}
            />

            <EmailDisplayButton
              selectedThread={selectedThread}
              label="Forward"
              icon={<Icon.forward className="h-4 w-4" />}
            />
          </div>
          <Separator
            orientation="vertical"
            className="mx-2 h-6"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!selectedThread}
              >
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
        <EmailDisplayInbox selectedThread={selectedThread} />
      </div>
    </ResizablePanel>
  )
}
