import axios from 'axios'
import { QueryFunctionContext } from '@tanstack/react-query'

import { GetThreadsRes, QueryKeyType } from './getThreads.types'
import { ThreadMessageType } from '../getThread/getThread.types'

export const getThreads = async ({ queryKey }: QueryFunctionContext): Promise<ThreadMessageType> => {
  const [, { q, maxResults, fields }] = queryKey as QueryKeyType
  try {
    const { data } = await axios.post<GetThreadsRes>(
      `${process.env.ROOT_URL}/email/get/threads`,
      {
        user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
        thread_id: '1906343e98e4780b',
        q,
        fields,
        maxResults,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return data.data
  } catch (error) {
    throw new Error('Failed to fetch threads')
  }
}
