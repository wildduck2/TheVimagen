import axios from 'axios'
import { get_threads_res } from './get_threads.types'

export const get_threads = async () => {
  // NOTE: fetching thread from db
  const { data } = await axios.post<get_threads_res>(
    `${process.env.ROOT_URL}/email/get/threads`,
    {
      user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
      thread_id: '1906343e98e4780b',
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
