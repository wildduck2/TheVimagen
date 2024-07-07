import { useDispatch, useSelector } from 'react-redux'

import { getSelectedEmailIdDispatch, RootState } from '@/context'
import { cn } from '@/utils'
import { ListItemWrapperType } from './ListItemWrapper.types'
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
import { CheckboxWrapper } from '../CheckboxWrapper'
import { Icon } from '@/assets'
import { Separator } from '../Spearator'
import React from 'react'

export const ListItemWrapper = ({ children, ids, item, icon }: ListItemWrapperType) => {
  const emailSelectedId = useSelector((state: RootState) => state.email.selectedEmailId)
  const dispatch = useDispatch()

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="email__list__wrapper__item">
            <div>
              <div className="email__list__wrapper__item__functionality__card">
                <CheckboxWrapper checked={false} tip="Select" />
                <Separator />
                {icon}
              </div>
            </div>
            <div className={cn('email__list__wrapper__item__body', emailSelectedId[0] === ids[0] && 'active')}>
              <div
                key={item.id}
                className={cn('email__list__wrapper__item__body__card')}
                onClick={() => {
                  emailSelectedId[0] !== ids[0] && dispatch(getSelectedEmailIdDispatch(ids))
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {emailItemContextMenu.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                {item.map((mini, idx) => (
                  <ContextMenuItem key={idx}>
                    {mini.icon({ className: 'size-4 mr-2' })}
                    {mini.label}
                    <ContextMenuShortcut>{mini.shortcut}</ContextMenuShortcut>
                  </ContextMenuItem>
                ))}
                {idx !== emailItemContextMenu.length - 1 && <ContextMenuSeparator />}
              </React.Fragment>
            )
          })}
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}

export const emailItemContextMenu = [
  [
    {
      icon: Icon.reply,
      label: 'Reply',
      shortcut: '⌘ar',
    },

    {
      icon: Icon.replyAll,
      label: 'Reply all',
      shortcut: '⌘ara',
    },
    {
      icon: Icon.forward,
      label: 'Forward',
      shortcut: '⌘af',
    },
    {
      icon: Icon.file,
      label: 'Forward as attachment',
      shortcut: '⌘afa',
    },
  ],
  [
    {
      icon: Icon.fiStar,
      label: 'Archive',
      shortcut: '⌘aa',
    },

    {
      icon: Icon.trash2,
      label: 'Delete',
      shortcut: '⌘ad',
    },
    {
      icon: Icon.emailOpen,
      label: 'Make as read',
      shortcut: '⌘ar',
    },
    {
      icon: Icon.clock,
      label: 'Snooze',
      shortcut: '⌘as',
    },
    {
      icon: Icon.clipboardChecked,
      label: 'Add to Tasks',
      shortcut: '⌘at',
    },
  ],
  [
    {
      icon: Icon.folderMove,
      label: 'Move to',
      shortcut: '⌘ac',
    },

    {
      icon: Icon.tag,
      label: 'Label as',
      shortcut: '⌘al',
    },
    {
      icon: Icon.notfOff,
      label: 'Mute',
      shortcut: '⌘am',
    },
  ],
  [
    {
      icon: Icon.popup,
      label: 'Open in popup',
      shortcut: '⌘op',
    },
  ],
]

// <Separator />
//           <ToggleMutationButton
//             labelIds={item.labelIds}
//             threadId={item.threadId}
//             icon={Icon.trash2}
//             tip="Trash"
//           />
//           <Separator />
//           <ToggleMutationButton
//             labelIds={item.labelIds}
//             threadId={item.threadId}
//             icon={Icon.archive}
//             tip="Archive"
//           />
