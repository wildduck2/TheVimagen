import axios from 'axios'
import { StartThreadRsponse, StartThreadType } from './startThread.types'

export const startThread = async ({ addLabelIds, removeLabelIds }: StartThreadType): Promise<StartThreadRsponse> => {
  try {
    const { data } = await axios.post<Promise<StartThreadRsponse>>(
      `${process.env.ROOT_URL}/email/post/thread-start`,
      {
        addLabelIds,
        removeLabelIds,
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
