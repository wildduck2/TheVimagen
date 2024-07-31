import { OnClickType } from '@/components/ui'
import {
  getLabelButtonStatus,
  getMultiReplyState,
  getReplyStatusState,
  getSelectedThreadsDispatch,
  getSnoozeButtonStatus,
  RootState,
} from '@/context'
import { useDispatch, useSelector } from 'react-redux'
import { UseThreadActionType } from './useThreadAction.types'
import { useArchiveMutate, useDeleteMutate, useMarkAsRead, useToggleFavoriate, useTrashMutate } from '@/hooks'

export const useThreadAction = ({ items }: UseThreadActionType) => {
  const selectedThread = useSelector((state: RootState) => state.email.selectedThread)
  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)

  const { startMutation: startMarkAsRead } = useMarkAsRead({ marktype: 'READ', threads: items })
  const { startMutation: startMarkAsUnRead } = useMarkAsRead({ marktype: 'UNREAD', threads: items })
  const { startMutation: startFavoriate } = useToggleFavoriate({ threads: items })
  const { startMutation: startTrash } = useTrashMutate({ threads: items })
  const { startMutation: startArchive } = useArchiveMutate({ threads: items })
  const { startMutation: startDelete } = useDeleteMutate({ threads: items })

  const actions = {
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
      // const msg = createMimeMessage()
      // msg.setSender({ name: 'Lorem Ipsum', addr: 'lorem@ipsum.com' })
      // msg.setRecipient('foobor@test.com')
      // msg.setSubject('🚀 Issue 49!')
      // msg.addMessage({
      //   contentType: 'text/plain',
      //   data: `Hi, I'm a simple text.`,
      // })
      // const raw = msg.asRaw()
      // console.log(raw)
      // dispatch(getMultiReplyState({ alert: false, drawer: true }))
      // dispatch(getReplyStatusState({ replyAll: false, forward: true, attachment: true }))
      // dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    Archive: () => {
      startArchive.mutate()
    },
    Trash: () => {
      startTrash.mutate()
    },
    Star: () => {
      if (!items[0].labelIds.includes('STARRED')) {
        startFavoriate.mutate()
      }
    },
    Delete: () => {
      startDelete.mutate()
    },
    Read: () => {
      if (items[0].labelIds.includes('UNREAD')) {
        startMarkAsRead.mutate()
      }
    },
    Unread: () => {
      if (!items[0].labelIds.includes('UNREAD')) {
        startMarkAsUnRead.mutate()
      }
    },
    Snooze: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getSnoozeButtonStatus({ snoozeButtonStatus: true, onTheFlyAction: true }))
    },
    Label: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getLabelButtonStatus({ labelButtonStatus: true, onTheFlyAction: true, move: false }))
    },
    Move: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getLabelButtonStatus({ labelButtonStatus: true, onTheFlyAction: true, move: true }))
    },
    Popup: () => {
      localStorage.setItem('emailSelected', JSON.stringify(items))
      const width = 600
      const height = 600
      const left = (screen.width - width) / 2
      const top = (screen.height - height) / 2

      window.open(
        'http://localhost:5173/email/popup?email=',
        '_blank',
        `width=${width},height=${height}, left=${left}, top=${top}`,
      )
    },
  }

  const dispatch = useDispatch()

  return { actions, dispatch, selectedThread, selectedThreads } as const
}
