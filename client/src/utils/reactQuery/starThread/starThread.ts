import axios from 'axios'
import { StarThreadRsponse, StarThreadType } from './starThread.types'

export const starThread = async ({
  addLabelIds,
  removeLabelIds,
  threadId,
}: StarThreadType): Promise<StarThreadRsponse> => {
  try {
    const { data } = await axios.post<Promise<StarThreadRsponse>>(
      `${process.env.ROOT_URL}/email/moify/thread`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
        addLabelIds,
        removeLabelIds,
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
