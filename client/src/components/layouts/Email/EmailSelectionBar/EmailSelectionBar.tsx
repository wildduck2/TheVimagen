import { RootState } from '@/context'
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
  ReplyMutate,
  Separator,
  ToggleFavoriateButton,
  ToggleToolTipButtonWrapper,
  TrashMutate,
} from '@/components/ui'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie } from '@/utils'

export const EmailSelectionBar = ({ itemsIds }: EmailSelectionBarProps) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)
  const dispatch = useDispatch()

  console.log(selectedThreads.length === 0 ? false : true)

  return (
    <div className="email__selection__bar">
      <CheckboxWrapper
        perSelected={selectedThreads.length > 0}
        checked={selectedThreads.length === 0 ? false : true}
        action={(checked) => {
          console.log(checked)

          // ? dispatch(removeSelectedThreadsDispatch(items[0].threadId))
          // : dispatch(getSelectedThreadsDispatch(items[0].threadId))
        }}
        tip="Select"
      />

      <Separator orientation="vertical" />
      <ArchiveMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Archive"
      />
      <Separator orientation="vertical" />
      <JunkMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Move to Junk"
      />
      <Separator orientation="vertical" />
      <ToggleFavoriateButton
        disabled={selectedThreads.length === 0}
        labelIds={[]}
        threadId={''}
        tip="Star"
      />
      <Separator orientation="vertical" />
      <TrashMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Move to Trash"
      />
      <Separator orientation="vertical" />
      <DeleteMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Delete"
      />
      <Separator orientation="vertical" />
      <MarkAsReadMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Mark as Read"
      />
      <Separator orientation="vertical" />
      <ReplyMutate
        disabled={selectedThreads.length === 0}
        threadId={''}
        tip="Reply"
      />
      <Separator orientation="vertical" />
      <EmailSnoozeButton emailSelectedId={[]} />

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
