import { Session, SessionData } from 'express-session'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type ZodCredentialsValidationType = {
    email: string
    password: string
}

export type CheckUserExistInDbType = {
    email: string
}

export type CreateNewUserType = {
    password: string
    email: string
    user_name: string
    session_id: string
    session: Session & Partial<SessionData>
    expires_at: Date
}

export type GenerateOTPType = {
    user_id: string
}

export type SendEmailType = {
    email: string
    otp: string
    title: string
    cb: (err: Error | null, info: SMTPTransport.SentMessageInfo | null) => void
}

export type FindSesssionIfNotCreateOneType = {
    user_id: string
    session_id: string
    session: Session & Partial<SessionData>
    expires_at: Date
}

export type verifyOTPType = {
    user_id: string
    otp: string
}

export type CompleteUserInfoSignupStep3Type = {
    user_id: string
    age: number
    bio: string
    last_name: string
    first_name: string
    pronounce: string
    years_of_exprience: number
    profession: string
}

export type DeleteSessionType = { user_id: string }

export type GetGoogleOAuthTokenType = {
    code: string
}

export type GetGoogleUserInfoType = {
    id_token: string
    access_token: string
}

export type UpsertUserOauthDataType = {
    email: string
    verified_email: boolean
    first_name: string
    last_name: string
    picture: string
}

export type UpsertOauthDataType = {
    oauth_id: string
    user_id: string
    refresh_token: string
    id_token: string
    access_token: string
    expire_in: number
}

export type getOauthDataType = {
    user_id: string
}
