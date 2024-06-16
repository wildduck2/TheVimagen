import express from 'express';
import dotEnv from 'dotenv'
import { authRouter, oauthRouter } from './routes';
import cors from 'cors';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { IPrisma } from '@quixo3/prisma-session-store/dist/@types';
import { prisma } from './prismaClient';
import bodyParser from 'body-parser'

const app = express();

dotEnv.config({
    path: "http://localhost:5173/*"
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
        secret: 'your_secret_key',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma as unknown as IPrisma<"session">, {
            checkPeriod: 2 * 60 * 1000, 
            dbRecordIdIsSessionId: true,
        }),
    })
);

app.use(oauthRouter)
app.use(authRouter)

app.listen(3000, () => {
    console.log('wild_duck server is runing and listening to the port : 3000');
});
