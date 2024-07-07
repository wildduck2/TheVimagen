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
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        thread_id: '1906343e98e4780b',
        q,
        fields,
        maxResults: 1,
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
