import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getThreads, groupMessagesBySender, MessageType, QueryKeyType, searchMessages } from '@/utils'
import { ScrollAreaChildRef, Skeleton } from '@/components/ui'

import { EmailListItem } from '../EmailListItem'
import { EmailListProps } from './EmailList.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'
import { useWindowScroll } from '@/hooks'

export function EmailList({ q, queryKey }: EmailListProps) {
  //INFO: handling featching data
  const qk: QueryKeyType = [queryKey, { q }]
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: qk,
    queryFn: getThreads,
    initialPageParam: '',
    getNextPageParam: (prev) => prev.nextPageToken,
    refetchOnWindowFocus: false,
  })

  //INFO: handling ids to feach message and groupMessagesBySender
  const searchId = useSelector((state: RootState) => state.email.searchInput)
  const finalData =
    data &&
    data.pages.flatMap((item) =>
      groupMessagesBySender(searchMessages({ searchText: searchId, messages: item.messages })),
    )

  //INFO: handling scroll and refetch next page
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useWindowScroll({ scrollRef, cb: () => fetchNextPage() })

  return (
    <ScrollAreaChildRef className="email__list" ref={scrollRef}>
      <div className="email__list__wrapper">
        {status === 'success' ? (
          finalData.length > 0 ? (
            <>
              {(finalData as MessageType[][]).map((item, idx) => (
                <EmailListItem key={idx} item={item[0]} items={item} />
              ))}

              {/*NOTE: handling refetching next page error */}
              {isFetchingNextPage &&
                (isFetchingNextPage ? (
                  <p className="email__list__wrapper__loadmore w-fit self-center">Loading more...</p>
                ) : hasNextPage ? (
                  <p className="email__list__wrapper__loadmore w-fit self-center">Load More</p>
                ) : (
                  <p className="email__list__wrapper__loadmore w-fit self-center">Nothing more to load</p>
                ))}
            </>
          ) : (
            <div className="email__display__inbox__not__found">No message found with your search.</div>
          )
        ) : status === 'pending' || isFetching ? (
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
        ) : (
          <div className="email__display__inbox__not__found">No Messages, Failed to get messages!!{error.message}</div>
        )}
      </div>
    </ScrollAreaChildRef>
  )
}
