import { getSelectedThreadsDispatch, removeSelectedThreadsDispatch, RootState } from '@/context'
import { useDispatch, useSelector } from 'react-redux'
import { EmailSelectionBarProps } from './EmailSelectionBar.types'
import {
  ArchiveMutate,
  Checkbox,
  CheckboxWrapper,
  DeleteMutate,
  EmailSnoozeButton,
  JunkMutate,
  MarkAsReadMutate,
  MultiCheckboxWrapper,
  ReplyMutate,
  Separator,
  ToggleFavoriateButton,
  ToggleToolTipButtonWrapper,
  TrashMutate,
} from '@/components/ui'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie } from '@/utils'

export const EmailSelectionBar = () => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)
  const threadsFetched = useSelector((state: RootState) => state.email.threadsFetched)
  const dispatch = useDispatch()

  return (
    <div className="email__selection__bar">
      <MultiCheckboxWrapper
        dataCompare={threadsFetched || []}
        data={selectedThreads}
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
        threadIds={selectedThreads}
        tip="Archive"
      />
      <Separator orientation="vertical" />
      <JunkMutate
        disabled={selectedThreads.length === 0}
        threadIds={selectedThreads}
        tip="Move to Junk"
      />
      <Separator orientation="vertical" />
      <ToggleFavoriateButton
        disabled={selectedThreads.length === 0}
        labelIds={[]}
        threadIds={selectedThreads}
        tip="Star"
      />
      <Separator orientation="vertical" />
      <TrashMutate
        disabled={selectedThreads.length === 0}
        threadIds={selectedThreads}
        tip="Move to Trash"
      />
      <Separator orientation="vertical" />
      <DeleteMutate
        disabled={selectedThreads.length === 0}
        threadId={selectedThreads}
        tip="Delete"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="READ"
        disabled={selectedThreads.length === 0}
        threadIds={selectedThreads}
        tip="Mark as Read"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="UNREAD"
        disabled={selectedThreads.length === 0}
        threadIds={selectedThreads}
        tip="Mark as Uread"
      />
      <Separator orientation="vertical" />
      <ReplyMutate
        disabled={selectedThreads.length === 0}
        threadIds={selectedThreads}
        tip="Reply"
      />
      <Separator orientation="vertical" />
      <EmailSnoozeButton emailSelectedId={selectedThreads} />

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
