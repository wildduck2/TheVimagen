import axios from 'axios'
import { GetThread, GetThreadRes } from './getThread.types'

export const getThread = async ({ thread_id }: GetThread) => {
  if (!thread_id) return null

  const { data } = await axios.post<GetThreadRes>(
    `${process.env.ROOT_URL}/email/get/thread`,
    {
      user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
      thread_id,
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
