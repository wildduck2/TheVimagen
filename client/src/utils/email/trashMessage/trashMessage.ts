import axios from 'axios'
import { DeletedMessageRes, TrashMessage } from './trashMessage.types'

export const trashMessage = async ({ threadId }: TrashMessage): Promise<DeletedMessageRes> => {
  try {
    const { data } = await axios.post<Promise<DeletedMessageRes>>(
      `${process.env.ROOT_URL}/email/trash/thread`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        threadId,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!data) return null

    return data
  } catch (error) {
    return null
  }
}
