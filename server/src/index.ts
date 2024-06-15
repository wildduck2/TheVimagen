import express from 'express';
import dotEnv from 'dotenv'
import { authRouter, oauthRouter } from './routes';
// import { PrismaClient } from '@prisma/client/edge'

import cors from 'cors';


dotEnv.config({
    path: "http://localhost:5173/*"
})

// export const prisma = new PrismaClient()

const app = express();
app.use(cors())


app.use(oauthRouter)
app.use(authRouter)

app.listen(3000, () => {
    console.log('wild_duck server is runing and listening to the port : 3000');
});
