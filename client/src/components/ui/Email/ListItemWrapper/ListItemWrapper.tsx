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
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  CheckboxWrapper,
  Separator,
} from '../..'
import { Icon } from '@/assets'
import { ToggleFavoriateButton } from '../ToggleFavoriateButton'
import { TrashMutate } from '../TrashMutate'

export const ListItemWrapper = ({ children, item }: ListItemWrapperType) => {
  const emailSelectedId = useSelector((state: RootState) => state.email.SelectedEmailData)

  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)
  const dispatch = useDispatch()
  const ids = [item.threadId]

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="email__list__wrapper__item">
            <div>
              <div className="email__list__wrapper__item__functionality__card">
                <CheckboxWrapper
                  checked={selectedThreads.includes(item.threadId)}
                  action={({ checked }) => {
                    checked ? dispatch(removeSelectedThreadsDispatch(ids)) : dispatch(getSelectedThreadsDispatch(ids))
                  }}
                  tip="Select"
                />
                <Separator />
                <ToggleFavoriateButton
                  labelIds={item.labelIds}
                  threadIds={[item.threadId]}
                  tip="Star"
                />
                <Separator />
                <TrashMutate
                  threadIds={[item.threadId]}
                  tip="Trash"
                />
              </div>
            </div>
            <div className={cn('email__list__wrapper__item__body', emailSelectedId.ids[0] === ids[0] && 'active')}>
              <div
                key={item.id}
                className={cn('email__list__wrapper__item__body__card')}
                onClick={() => {
                  emailSelectedId.ids[0] !== ids[0] &&
                    dispatch(
                      getSelectedEmailIdDispatch({
                        ids: ids && ids,
                        inReplyTo:
                          ids &&
                          item.payload.headers.find((name) => name.name === 'Feedback-ID' || name.name === 'Message-ID')
                            ?.value,
                      }),
                    )
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
