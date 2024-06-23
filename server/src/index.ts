import express from 'express'
import dotEnv from 'dotenv'
import { authRouter, oauthRouter } from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import { prismaSession } from './utils'
import cookieParser from 'cookie-parser'
// import { csrfToken } from './middlewares';
// import { corsOptions } from './constants';

export const app = express()
dotEnv.config()

//NOTE: some configs for the routes
app.use(
  cors({
    origin: 'http://localhost:5173', // Specify the origin allowed to access the resource
    credentials: true // Reflect CORS headers in the response
  })
)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(prismaSession)
// app.use(doubleCsrfProtection);

// app.use(csrfToken)
app.use(oauthRouter)
app.use(authRouter)

app.listen(3000, () => {
  console.log('wild_duck server is runing and listening to the port : 3000')
})
