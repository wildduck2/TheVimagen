import axios from 'axios'
import { toast } from 'sonner'

export type LabelQueryRes = {
  data: {} | null
  error: string | null
}

export const labelQuery = async () => {
  try {
    const { data } = await axios.get<LabelQueryRes>(`${process.env.ROOT_URL}/email/get/labels`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    toast.success('labels fetched successfully')
    return data.data
  } catch (error) {
    toast.error('Error: Failed to fetch labels')
    return null
  }
}
