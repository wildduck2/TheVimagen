import { IEmail } from 'gmail-api-parse-message-ts'

export type use_get_thread = null
export type use_get_thread_res = Awaited<Promise<{ error: string | null; data: IEmail }>>
