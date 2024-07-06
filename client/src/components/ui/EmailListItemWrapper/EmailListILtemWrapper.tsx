import { useDispatch, useSelector } from 'react-redux'

import { getSelectedEmailIdDispatch, RootState } from '@/context'
import { cn } from '@/utils'
import { EmailListITemWrapperType } from './EmailListILtemWrapper.types'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../ContextMenu'
import { ToggleMutationButton } from '../ToggleMutationButton'
import { Toggle } from '../Toggle'

export const EmailListITemWrapper = ({ children, ids, item }: EmailListITemWrapperType) => {
  const emailSelectedId = useSelector((state: RootState) => state.email.selectedEmailId)
  const dispatch = useDispatch()

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={cn('email__list__wrapper__item', emailSelectedId[0] === ids[0] && 'bg-muted')}>
            <div className="email__list__wrapper__item__functionality__card">
              <Toggle>
                <ToggleMutationButton labelIds={item.labelIds} threadId={item.threadId} />
              </Toggle>
            </div>
            <div
              key={item.id}
              className={cn('email__list__wrapper__item__card', emailSelectedId[0] === ids[0] && 'bg-muted')}
              onClick={() => {
                emailSelectedId[0] !== ids[0] && dispatch(getSelectedEmailIdDispatch(ids))
              }}
            >
              {children}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
