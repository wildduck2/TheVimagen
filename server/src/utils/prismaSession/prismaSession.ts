import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import expressSession from 'express-session'
import { IPrisma } from '@quixo3/prisma-session-store/dist/@types'

export const prisma = new PrismaClient()
export const prismaSession = expressSession({
  cookie: {
    maxAge: 70 * 60 * 1000, // 7 days
    // sameSite: 'lax',
    //  secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    secure: false
    // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma as unknown as IPrisma<'session'>, {
    checkPeriod: 3 * 60 * 1000,
    dbRecordIdIsSessionId: true
  })
})
