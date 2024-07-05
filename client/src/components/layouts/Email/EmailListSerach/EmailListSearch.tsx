import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Input, Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { getSearchInput } from '@/context'
import { useDebounce } from '@/hooks'
import { Icon } from '@/assets'
import { queryClient } from '@/main'
import { getCookie } from '@/utils'

export const EmailListSearch = () => {
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
          <Input placeholder="Search" onChange={({ currentTarget }) => setSq(currentTarget.value)} value={sq} />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className=""
              children={<Icon.refresh className="size-5" />}
              onClick={(e) => {
                e.preventDefault()
                const defaultActive = getCookie('tabs:active').toLowerCase() || 'primary'
                queryClient.refetchQueries({ queryKey: [defaultActive, { q: `category:${defaultActive}` }] })
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="z-[1000000]">
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>
      </form>
    </>
  )
}
