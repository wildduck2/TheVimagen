import axios from 'axios'
import { QueryKeyType } from '../getThreads'
import { GetTimeEstimatedType } from './getTimeEstimated.types'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getTimeEstimated = async ({ queryKey }: QueryFunctionContext) => {
  const [, { q, fields }] = queryKey as QueryKeyType
  try {
    const { data } = await axios.post<GetTimeEstimatedType>(
      `${process.env.ROOT_URL}/email/get/time-estimated`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        thread_id: '1906343e98e4780b',
        q,
        fields,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return data.data.resultSizeEstimate
  } catch (error) {
    return null
  }
}
