import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { modifyThread, getCookie } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { ArchiveMutateType } from './ArchiveMutate.types'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'
import { useDispatch } from 'react-redux'
import { getSelectedEmailDispatch } from '@/context'
import { useArchiveMutate } from '@/hooks'

export const ArchiveMutate = ({ disabled, threads, tip }: ArchiveMutateType) => {
  const { startMutation } = useArchiveMutate({ threads })
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.archive />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
