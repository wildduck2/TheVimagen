import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import expressSession from "express-session"
import { prisma } from "../../prismaClient"
import { IPrisma } from "@quixo3/prisma-session-store/dist/@types"

export const prismaSession = expressSession({
    cookie: {
        maxAge: 70 * 60 * 1000, // 7 days
        // sameSite: 'lax'
        //  secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma as unknown as IPrisma<"session">, {
        checkPeriod: 3 * 60 * 1000,
        dbRecordIdIsSessionId: true,
    }),
})
