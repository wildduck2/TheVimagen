import { OAuthToken } from '@prisma/client'
import { Decimal, JsonValue } from '@prisma/client'
import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: User
    otp: string
    oauth_user_data?: OAuthToken | null
  }
}

export interface User {
  id: string
  first_name?: string | null
  last_name?: string | null
  user_name: string
  google_id?: string | null
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
  verified_email?: boolean | null
  created_at: Date
  updated_at: Date
}

declare global {
  interface Wildduck {
    userName: string
    age: number
  }
}

declare global {
  type Foo = {
    ahmed: string
  }
}
