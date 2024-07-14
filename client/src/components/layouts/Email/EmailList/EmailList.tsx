import { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

import { cn, getThreads, groupMessagesBySender, MessageType, searchMessages } from '@/utils'
import { Badge, ScrollAreaChildRef, Skeleton } from '@/components/ui'

import { getThreadsFetchedDispatched, RootState } from '@/context'
import { useWindowScroll } from '@/hooks'
import { Icons } from '@/constants'
import { EmailListItem } from '../EmailListItem'
import { EmailListProps } from './EmailList.types'

export function EmailList({ q, queryKey }: EmailListProps) {
  //INFO: handling featching data
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, isRefetching } =
    useInfiniteQuery({
      queryKey: [queryKey, { q }],
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

  //NOTE: assigning data to the context slice to use in perselection functionality
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getThreadsFetchedDispatched(finalData && finalData.map((item) => item[0].threadId)))
  }, [finalData])

  return (
    <ScrollAreaChildRef
      className="email__list"
      ref={scrollRef}
    >
      <div className="email__list__wrapper">
        {status === 'success' ? (
          finalData.length > 0 ? (
            <>
              <Badge
                className={cn('email__list__wrapper__loading', isRefetching && 'show', isFetchingNextPage && 'show')}
              >
                {isFetchingNextPage ? 'Loading more...' : 'Updating...'}
              </Badge>
              {(finalData as MessageType[][]).map((item, idx) => (
                <EmailListItem
                  key={idx}
                  item={item[0]}
                  items={item}
                />
              ))}

              {/*NOTE: handling refetching next page error */}
              {isFetchingNextPage &&
                (isFetchingNextPage ? (
                  <p className="email__list__wrapper__loadmore self-center mt-3">
                    <Icons.spinner className="spin" />
                  </p>
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
            <div
              className="grid items-center  border border-solid border-input p-3 rounded-lg w-full"
              key={idx}
            >
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
                  <Skeleton className={`h-2 w-[50%]`} />
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
