import { useQuery } from '@tanstack/react-query'

import { getThreads, groupMessagesBySender, MessageType, searchMessages } from '@/utils'
import { ScrollArea, Skeleton } from '@/components/ui'

import { EmailListItem } from '../EmailListItem'
import { EmailListProps } from './EmailList.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export function EmailList({ q, queryKey }: EmailListProps) {
  const { data, isFetched } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getThreads({ q }),
  })

  const searchId = useSelector((state: RootState) => state.email.searchInput)
  const finalData =
    data &&
    (q === 'category:primary'
      ? groupMessagesBySender(searchMessages({ searchText: searchId, messages: data.messages }))
      : groupMessagesBySender(searchMessages({ searchText: searchId, messages: data.messages })))
  // : searchMessages({ searchText: searchId, messages: data.messages }))

  return (
    <ScrollArea className="email__list">
      <div className="email__list__wrapper">
        {isFetched ? (
          finalData.length > 0 ? (
            (finalData as MessageType[][]).map((item, idx) => <EmailListItem key={idx} item={item[0]} items={item} />)
          ) : (
            <div className="email__display__inbox__not__found">No message found with your search.</div>
          )
        ) : (
          Array.from({ length: 10 }).map((_, idx) => (
            <div className="grid items-center  border border-solid border-input p-3 rounded-lg w-full" key={idx}>
              <div className="grid gap-2">
                <div className="grid grid-cols-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-2 w-20 " />
                    <Skeleton className="h-2 w-2 " />
                  </div>
                  <Skeleton className="h-2 w-[30%] place-self-end" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className={`h-2 w-[60%] mb-1`} />
                  <Skeleton className={`h-2 `} />
                  <Skeleton className={`h-2 w-[70%]`} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
