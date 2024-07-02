import axios from 'axios'
import { GetThreads, GetThreadsRes } from './getThreads.types'

export const getThreads = async ({ labelIds }: GetThreads) => {
  // NOTE: fetching thread from db
  const { data } = await axios.post<GetThreadsRes>(
    `${process.env.ROOT_URL}/email/get/threads`,
    {
      user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
      thread_id: '1906343e98e4780b',
      maxResults: 10,
      labelIds,
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return data.data
}
