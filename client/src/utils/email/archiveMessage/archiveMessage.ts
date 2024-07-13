import axios from 'axios'
import { ArchiveMessageProps, ArchiveMessageRes } from './archiveMessage.types'

export const archiveMessage = async ({ threadId }: ArchiveMessageProps): Promise<ArchiveMessageRes> => {
  try {
    const { data } = await axios.post<Promise<ArchiveMessageRes>>(
      `${process.env.ROOT_URL}/email/delete/thread`,
      { threadId },
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
