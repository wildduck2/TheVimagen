import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Input } from '@/components/ui'
import { getSearchInput } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

export const EmailListSearch = () => {
  const [sq, setSq] = useState<string>('')
  const dispatch = useDispatch()

  useDebounce(() => {
    dispatch(getSearchInput(sq))
  })

  return (
    <>
      <form>
        <div>
          <Icon.search />
          <Input placeholder="Search" onChange={({ currentTarget }) => setSq(currentTarget.value)} value={sq} />
        </div>
      </form>
    </>
  )
}
