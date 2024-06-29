import axios from 'axios'
import { toast } from 'sonner'
import { use_get_threads_res } from './use_get_threads.types'
import { useDispatch } from 'react-redux'
import { get_threads_data } from '@/context'
import { useEffect } from 'react'

export const use_get_threads = () => {
  const dispatch = useDispatch()
  const get_threads_invoce = async () => {
    try {
      //NOTE: fetching thread from db
      // const { data, statusText } = await axios.post<use_get_threads_res>(
      //   `${process.env.ROOT_URL}/email/get/threads`,
      //   {
      //     user_id: '2dfa461a-85e8-4ac7-b0e9-28b1d88bd6dc',
      //     thread_id: '1906343e98e4780b',
      //   },
      //   {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // )
      //
      // if (!data || statusText !== 'OK') {
      //   toast.error(`Failed to fetch this threads msgs`)
      //   return null
      // }

      console.log('hi')

      // dispatch(get_threads_data(data.data))
      // return data.data.threads
    } catch (error) {
      console.log(error)
      toast.error(`Failed to fetch threads msgs`)
      return null
    }
  }
  useEffect(() => {
    get_threads_invoce()
  }, [])
}
