import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Input } from '@/components/ui'
import { getSearchInput } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

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
