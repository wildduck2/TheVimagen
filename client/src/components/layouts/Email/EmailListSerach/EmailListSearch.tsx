import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Input, Separator } from '@/components/ui'
import { getSearchInput } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'

export const EmailListSearch = () => {
  const [sq, setSq] = useState<string>('')
  const debounceValue = useDebounce(sq)
  const dispatch = useDispatch()

  useEffect(() => {
    //NOTE: debouncing the input on change
    dispatch(getSearchInput(debounceValue))
  }, [debounceValue])
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
