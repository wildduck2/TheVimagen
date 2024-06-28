import { JsonValue } from '@prisma/client/runtime/library'
import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: User
    otp: string
  }
}

export interface User {
  id: string
  first_name?: string | null
  last_name?: string | null
  user_name: string
  email: string
  address?: JsonValue | null
  age?: number | null
  bio?: string | null
  picture?: string | null
  pronounce?: string | null
  years_of_exprience?: number | null
  profession?: string | null
  lastlogin_ip?: string | null
  password: string
  password_reset_token?: string | null
  password_reset_token_expiration?: Date | null
  verified_email?: boolean | null
  created_at: Date
  updated_at: Date
}
