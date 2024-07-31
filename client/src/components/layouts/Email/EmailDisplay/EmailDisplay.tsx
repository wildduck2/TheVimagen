import { useSelector } from 'react-redux'

import {
  ArchiveMutate,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmailSnoozeButton,
  JunkMutate,
  ResizablePanel,
  Separator,
  ToggleToolTipButtonWrapper,
  TrashMutate,
} from '@/components/ui'
import { Icon } from '@/assets'
import { RootState } from '@/context'

import { EmailDisplayInbox } from '../EmailDisplayInbox'
import { EmailDisplayProps } from './EmailDisplay.types'
import { useThreadAction } from '@/hooks'

export const emailDisplayButtonData = ['Archive', 'Move to junk', 'Move to trash']

export function EmailDisplay({ defaultLayout = 37 }: EmailDisplayProps) {
  const reduxSelectedThread = useSelector((state: RootState) => state.email.selectedThread)
  const localSelectedThread = JSON.parse(localStorage.getItem('emailSelected'))
  const selectedThread = reduxSelectedThread.length > 0 ? reduxSelectedThread : localSelectedThread
  const { dispatch, actions } = useThreadAction({ items: selectedThread })

  return (
    <ResizablePanel
      order={2}
      defaultSize={defaultLayout}
      minSize={40}
    >
      <div className="email__dispaly">
        <div className="email__dispaly__top">
          <div className="email__dispaly__top__content">
            <div>
              <ArchiveMutate threads={selectedThread ? selectedThread : []} />
              <JunkMutate threads={selectedThread ? selectedThread : []} />
              <TrashMutate threads={selectedThread ? selectedThread : []} />
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-6"
            />
            <EmailSnoozeButton selectedThread={selectedThread} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ToggleToolTipButtonWrapper
              disabled={selectedThread.length === 0}
              tip="Reply"
              onClick={() => actions.Reply({ dispatch, items: selectedThread })}
              children={<Icon.forward className="h-4 w-4" />}
            />

            <ToggleToolTipButtonWrapper
              disabled={selectedThread.length === 0}
              tip="Reply All"
              onClick={() => actions.ReplyAll({ dispatch, items: selectedThread })}
              children={<Icon.replyAll className="h-4 w-4" />}
            />
            <ToggleToolTipButtonWrapper
              disabled={selectedThread.length === 0}
              tip="Forward"
              onClick={() => actions.Forward({ dispatch, items: selectedThread })}
              children={<Icon.forward className="h-4 w-4" />}
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
              <DropdownMenuItem onClick={() => actions.Unread()}>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.Star()}>Move to Favorites</DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.Label()}>Add label</DropdownMenuItem>
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
