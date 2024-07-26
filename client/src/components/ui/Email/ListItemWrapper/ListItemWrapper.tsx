import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getMultiReplyState,
  getReplyStatusState,
  getSelectedEmailDispatch,
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
import { useMarkAsRead, useToggleFavoriate } from '@/hooks'
import { IEmail } from 'gmail-api-parse-message-ts'
import { UnknownAction } from 'redux'

export const ListItemWrapper = ({ children, items }: ListItemWrapperType) => {
  const selectedThread = useSelector((state: RootState) => state.email.selectedThread)
  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)

  const { startMutation: startMarkAsRead } = useMarkAsRead({ marktype: 'READ', threads: items })
  const { startMutation: startFavoriate } = useToggleFavoriate({ threads: items })

  const actions: Record<string, (props: OnClickType) => void> = {
    Reply: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    ReplyAll: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getReplyStatusState({ replyAll: true, forward: false, attachment: false }))
    },
    Forward: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getReplyStatusState({ replyAll: false, forward: true, attachment: false }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    ForwardAttachment: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getReplyStatusState({ replyAll: false, forward: true, attachment: true }))
    },
    Archive: () => {
      startFavoriate.mutate()
    },
    Trash: () => {
      startFavoriate.mutate()
    },
    Star: () => {
      startFavoriate.mutate()
    },
    Read: () => {
      startMarkAsRead.mutate()
    },
  }

  const dispatch = useDispatch()

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
                      ? dispatch(removeSelectedThreadsDispatch([items[0]]))
                      : dispatch(getSelectedThreadsDispatch([items[0]]))
                  }}
                  tip="Select"
                />
                <Separator />
                <ToggleFavoriateButton
                  threads={items}
                  tip="Star"
                />
                <Separator />
                <TrashMutate
                  threads={items}
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
                  if (selectedThread !== items) {
                    if (items[0].labelIds.includes('UNREAD')) {
                      startMarkAsRead.mutate()
                    }
                    dispatch(getSelectedEmailDispatch(items))
                  }
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {emailItemContextMenu.map((item, idx1) => {
            return (
              <React.Fragment key={idx1}>
                {item.map(({ shortcut, icon, label, key }, idx2) => (
                  <ContextMenuItem
                    key={idx2}
                    className="gap-5 w-full"
                    onClick={() => actions[key]({ dispatch, items })}
                  >
                    <div className="flex items-center gap-4 whitespace-nowrap">
                      {icon({ className: 'size-4' })}
                      <span>{label}</span>
                    </div>
                    <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
                  </ContextMenuItem>
                ))}
                {idx1 !== emailItemContextMenu.length - 1 && <ContextMenuSeparator />}
              </React.Fragment>
            )
          })}
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}

export type OnClickType = { dispatch: React.Dispatch<UnknownAction>; items: IEmail[] }

export const emailItemContextMenu = [
  [
    {
      icon: Icon.reply,
      label: 'Reply',
      key: 'Reply',
      shortcut: '⌘ar',
    },

    {
      icon: Icon.replyAll,
      label: 'Reply all',
      key: 'ReplyAll',
      shortcut: '⌘ara',
    },
    {
      icon: Icon.forward,
      label: 'Forward',
      key: 'Forward',
      shortcut: '⌘af',
    },
    {
      icon: Icon.file,
      label: 'Forward as attachment',
      key: 'ForwardAttachment',
      shortcut: '⌘afa',
    },
  ],
  [
    {
      icon: Icon.archive,
      label: 'Archive',
      key: 'Archive',
      shortcut: '⌘aa',
    },
    {
      icon: Icon.archiveX,
      label: 'Trash',
      key: 'Trash',
      shortcut: '⌘ax',
    },
    {
      icon: Icon.fiStar,
      label: 'Add to favorites',
      key: 'Star',
      shortcut: '⌘ad',
    },
    {
      icon: Icon.trash2,
      label: 'Delete',
      shortcut: '⌘ad',
    },
    {
      icon: Icon.emailOpen,
      label: 'Make as read',
      key: 'Read',
      shortcut: '⌘ar',
    },
    {
      icon: Icon.clock,
      label: 'Snooze',
      key: 'Snooze',
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
