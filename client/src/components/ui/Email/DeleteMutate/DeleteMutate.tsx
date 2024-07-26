import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { getCookie, trashMessage } from '@/utils'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { PaginatedMessages } from '../TrashMutate'
import { ToggleToolTipSpanWrapper } from '../..'
import { DeleteMutateProps } from './DeleteMutate.types'
import { getSelectedEmailDispatch } from '@/context'
import { useDispatch } from 'react-redux'
import { useDeleteMutate } from '@/hooks'

export const DeleteMutate = ({ disabled, threads, tip }: DeleteMutateProps) => {
  const { startMutation } = useDeleteMutate({ threads })

  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        onClick={() => {
          startMutation.mutate()
        }}
      >
        <Icon.X />
      </ToggleToolTipSpanWrapper>
    </>
  )
}
