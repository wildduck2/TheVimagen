import axios from 'axios'
import { toast } from 'sonner'

export type LabelQueryRes = {
  data: {} | null
  error: string | null
}

export const lableQuery = async () => {
  try {
    const { data } = await axios.get<LabelQueryRes>(``, {
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
