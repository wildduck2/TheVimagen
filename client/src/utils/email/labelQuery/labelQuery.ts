import axios from 'axios'
import { toast } from 'sonner'
import { LabelType } from '@/components/ui'

export type LabelQueryRes = {
  data: LabelType[] | null
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

    return data.data
  } catch (error) {
    toast.error('Error: Failed to fetch labels')
    return null
  }
}
