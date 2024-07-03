import axios from 'axios'
import { GetThreadType, GetThreadRes } from './getThread.types'
import { IEmail } from 'gmail-api-parse-message-ts'

export const getThread = async ({ threads_id }: GetThreadType): Promise<IEmail[]> => {
  if (!threads_id.length) return []

  const { data } = await axios.post<GetThreadRes>(
    `${process.env.ROOT_URL}/email/get/thread`,
    {
      user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
      threads_id,
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}
