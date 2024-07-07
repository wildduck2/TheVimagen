import axios from 'axios'
import { DeletedMessageRes, DeleteMessage } from './deleteMessage.types'

export const deleteMessage = async ({ id }: DeleteMessage): Promise<DeletedMessageRes> => {
  try {
    const { data } = await axios.post<Promise<DeletedMessageRes>>(
      `${process.env.ROOT_URL}/email/delete/thread`,
      { id },
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
