import { Session, SessionData } from 'express-session'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type ZodCredentialsValidationType = {
  email: string
  password: string
}

export type CheckUserExistInDbType = {
  email?: string | null
  userName?: string | null
}

export type CreateNewUserType = {
  password: string
  email: string
  userName: string
  sessionId: string
  session: Session & Partial<SessionData>
  expiresAt: Date
}

export type GenerateOTPType = {
  userId: string
}

export type SendEmailType = {
  email: string
  otp: string
  title: string
  cb: (err: Error | null, info: SMTPTransport.SentMessageInfo) => void
}

export type FindSesssionIfNotCreateOneType = {
  userId: string
  sessionId: string
  session: Session & Partial<SessionData>
  expiresAt: Date
}

export type CompleteUserInfoSignupStep3Type = {
  userID: string
  age: number
  bio: string
  lastName: string
  firstName: string
  pronounce: string
  yearsOfExprience: number
  profession: string
}
