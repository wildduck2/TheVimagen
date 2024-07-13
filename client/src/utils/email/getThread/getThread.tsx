import axios from 'axios'
import { GetThreadType, GetThreadRes } from './getThread.types'
import { IEmail } from 'gmail-api-parse-message-ts'

export const getThread = async ({ threads_id }: GetThreadType): Promise<IEmail[]> => {
  if (!threads_id.length) return []

  const { data } = await axios.post<GetThreadRes>(
    `${process.env.ROOT_URL}/email/get/thread`,
    {
      user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
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
