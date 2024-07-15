import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getSelectedEmailIdDispatch,
  getSelectedThreadsDispatch,
  removeSelectedThreadsDispatch,
  RootState,
} from '@/context'
import { cn } from '@/utils'
import { ListItemWrapperType } from './ListItemWrapper.types'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  CheckboxWrapper,
  Separator,
} from '../..'
import { ToggleFavoriateButton } from '../ToggleFavoriateButton'
import { TrashMutate } from '../TrashMutate'
import { Icon } from '@/assets'

export const ListItemWrapper = ({ children, items }: ListItemWrapperType) => {
  const selectedThread = useSelector((state: RootState) => state.email.selectedThread)

  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)
  const dispatch = useDispatch()

  // console.log(selectedThreads.includes(items[0]))

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="email__list__wrapper__item">
            <div>
              <div className="email__list__wrapper__item__functionality__card">
                <CheckboxWrapper
                  checked={items.some((item) => selectedThreads.some((thread) => thread.threadId === item.threadId))}
                  action={({ checked }) => {
                    checked
                      ? dispatch(removeSelectedThreadsDispatch(items))
                      : dispatch(getSelectedThreadsDispatch(items))
                  }}
                  tip="Select"
                />
                <Separator />
                <ToggleFavoriateButton
                  labelIds={items[0].labelIds}
                  threadIds={items.map((item) => item.threadId)}
                  tip="Star"
                />
                <Separator />
                <TrashMutate
                  threadIds={[items[0].threadId]}
                  tip="Trash"
                />
              </div>
            </div>
            <div
              className={cn(
                'email__list__wrapper__item__body',
                selectedThread.length && selectedThread[0].threadId === items[0].threadId && 'active',
              )}
            >
              <div
                key={items[0].id}
                className={cn('email__list__wrapper__item__body__card')}
                onClick={() => {
                  selectedThread !== items && dispatch(getSelectedEmailIdDispatch(items))
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
