import { ThreadsType } from '@/context'

export type use_get_threads = null
export type use_get_threads_res = Awaited<Promise<{ error: string | null; data: ThreadsType }>>
