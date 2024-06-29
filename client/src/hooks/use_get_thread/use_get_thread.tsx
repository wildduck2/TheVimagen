import axios from 'axios'
import { toast } from 'sonner'
import { use_get_thread_res } from './use_get_thread.types'

export const use_get_thread = () => {
  const get_thread_invoce = async () => {
    try {
      const { data, statusText } = await axios.post<use_get_thread_res>(
        `${process.env.ROOT_URL}/email/get/thread`,
        {
          user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
          thread_id: '1906343e98e4780b',
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!data || statusText !== 'OK') {
        toast.error(`Failed to fetch this email msg`)
        return null
      }

      //NOTE: removing the sepcial cahrs
      const email_text = data.data.textHtml.replace(`<[^>]+?>([^<]*)</[^>]+?>|([^<]*)/g`, '$1 $2'.replace(/\s+/g, ' '))
      console.log(email_text)

      return email_text
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return { get_thread_invoce } as const
}
