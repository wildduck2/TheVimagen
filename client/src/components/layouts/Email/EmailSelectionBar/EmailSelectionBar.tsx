import { getSelectedThreadsDispatch, getSnoozeButtonStatus, removeSelectedThreadsDispatch, RootState } from '@/context'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArchiveMutate,
  DeleteMutate,
  EmailSnoozeDropdown,
  JunkMutate,
  MarkAsReadMutate,
  MultiCheckboxWrapper,
  Popover,
  PopoverTrigger,
  ReplyMutate,
  Separator,
  ToggleFavoriateButton,
  ToggleToolTipButtonWrapper,
  ToggleToolTipSpanWrapper,
  TrashMutate,
} from '@/components/ui'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie } from '@/utils'
import { useSnoozeMutate } from '@/hooks'
import { IEmail } from 'gmail-api-parse-message-ts'

export const EmailSelectionBar = () => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]

  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)
  const threadsFetched = useSelector((state: RootState) => state.email.threadsFetched)
  const dispatch = useDispatch()

  const selectedThreadsIds = selectedThreads.map((thread) => thread.threadId)

  return (
    <div className="email__selection__bar">
      <MultiCheckboxWrapper
        dataCompare={threadsFetched ? threadsFetched.map((thread) => thread.threadId) : []}
        data={selectedThreadsIds}
        action={() => {
          if (selectedThreads.length === threadsFetched.length) {
            dispatch(removeSelectedThreadsDispatch(selectedThreads))
          } else {
            dispatch(getSelectedThreadsDispatch(threadsFetched))
          }
        }}
        tip="Select"
      />

      <Separator orientation="vertical" />
      <ArchiveMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Archive"
      />
      <Separator orientation="vertical" />
      <JunkMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Move to Junk"
      />
      <Separator orientation="vertical" />
      <ToggleFavoriateButton
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Star"
      />
      <Separator orientation="vertical" />
      <TrashMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Move to Trash"
      />
      <Separator orientation="vertical" />
      <DeleteMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Delete"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="READ"
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Mark as read"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="UNREAD"
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Mark as Unread"
      />
      <Separator orientation="vertical" />
      <ReplyMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads.length ? selectedThreads : []}
        tip="Reply"
      />
      <Separator orientation="vertical" />
      <SnoozeButtonMutateWireless selectedThreads={selectedThreads} />

      <Separator orientation="vertical" />
      <ToggleToolTipButtonWrapper
        children={<Icon.refresh className="size-4" />}
        onClick={(e) => {
          e.preventDefault()
          queryClient.refetchQueries(currentQueryKey)
        }}
        tip="Refresh"
      />
    </div>
  )
}
