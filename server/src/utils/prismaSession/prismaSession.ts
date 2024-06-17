import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import expressSession from "express-session"
import { prisma } from "../../prismaClient"
import { IPrisma } from "@quixo3/prisma-session-store/dist/@types"

export const prismaSession = expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // sameSite: 'lax'
    },
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma as unknown as IPrisma<"session">, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
    }),
})
