import { getSelectedThreadsDispatch, removeSelectedThreadsDispatch, RootState } from '@/context'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArchiveMutate,
  DeleteMutate,
  JunkMutate,
  LabelMutate,
  LabelMutateWireless,
  MarkAsReadMutate,
  MultiCheckboxWrapper,
  ReplyMutate,
  Separator,
  SnoozeButtonMutateWireless,
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
      />

      <Separator orientation="vertical" />
      <ArchiveMutate threads={selectedThreads ? selectedThreads : []} />
      <Separator orientation="vertical" />
      <JunkMutate threads={selectedThreads ? selectedThreads : []} />
      <Separator orientation="vertical" />
      <ToggleFavoriateButton threads={selectedThreads ? selectedThreads : []} />
      <Separator orientation="vertical" />
      <TrashMutate threads={selectedThreads ? selectedThreads : []} />
      <Separator orientation="vertical" />
      <DeleteMutate
        disabled={selectedThreads.length === 0}
        threads={selectedThreads ? selectedThreads : []}
        tip="Delete"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="READ"
        threads={selectedThreads ? selectedThreads : []}
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        marktype="UNREAD"
        threads={selectedThreads ? selectedThreads : []}
      />
      <Separator orientation="vertical" />
      <LabelMutateWireless threads={selectedThreads ? selectedThreads : []} />
      <Separator orientation="vertical" />
      <ReplyMutate threads={selectedThreads.length ? selectedThreads : []} />
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
