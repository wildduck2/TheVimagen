import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Input,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  ToggleToolTipButtonWrapper,
  Checkbox,
} from '@/components/ui'
import { getSearchInput, RootState } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie } from '@/utils'

export const EmailListSearch = () => {
  //NOTE: should make the context slicee for the selection threads
  const [sq, setSq] = useState<string>('')
  const dispatch = useDispatch()

  useDebounce(() => {
    dispatch(getSearchInput(sq))
  })

  return (
    <>
      <form className="flex items-center gap-2">
        <div className="w-full">
          <Icon.search />
          <Input
            placeholder="Search"
            onChange={({ currentTarget }) => setSq(currentTarget.value)}
            value={sq}
          />
        </div>
      </form>
    </>
  )
}
