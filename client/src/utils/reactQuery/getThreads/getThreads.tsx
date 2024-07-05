import axios from 'axios'
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query'

import { GetThreadsRes, QueryKeyType } from './getThreads.types'
import { ThreadMessageType } from '../getThread/getThread.types'

export const getThreads = async ({ queryKey, pageParam }: QueryFunctionContext): Promise<ThreadMessageType> => {
  const [, { q }] = queryKey as QueryKeyType
  const pageToken = pageParam as { pageParm: string }
  try {
    const { data } = await axios.post<GetThreadsRes>(
      `${process.env.ROOT_URL}/email/get/threads`,
      {
        user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
        thread_id: '1906343e98e4780b',
        q,
        pageToken,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return data.data // Assuming data.data is the response data you want to return
  } catch (error) {
    throw new Error('Failed to fetch threads')
  }
}
