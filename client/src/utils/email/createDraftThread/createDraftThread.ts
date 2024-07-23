import axios from 'axios'

export type CreateDraftTHreadRes = {
  data: string | null
  error: string | null
}
export type CreateDraftTHreadType = {}

export const createDraftThread = async () => {
  try {
    const { data } = await axios.post<Awaited<Promise<CreateDraftTHreadRes>>>(
      `${process.env.ROOT_URL}/email/modify/thread`,
      {
        user_id: 'fcb7d30c-b14a-47d3-bd9c-37ae5849c30e',
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
