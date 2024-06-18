import { Session, SessionData } from 'express-session';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type ZodCredentialsValidationType = {
    email: string;
    password: string;
};

export type CheckUserExistInDbType = {
    validEmail: string;
    userName: string;
};

export type CreateNewUserType = {
    validPassword: string;
    validEmail: string;
    userName: string;
    sessionId: string;
    session: Session & Partial<SessionData>;
    expiresAt: Date;
};

export type GenerateOTPType = {
    userId: string;
};

export type SendEmailType = {
    email: string;
    otp: string;
    title: string;
    cb: (err: Error | null, info: SMTPTransport.SentMessageInfo) => void;
};

export type FindSesssionIfNotCreateOneType = {
    userId: string
    sessionId: string;
    session: Session & Partial<SessionData>;
    expiresAt: Date;
}
