import express from 'express'
import dotEnv from 'dotenv'
import { oauth_router, auth_router, email_router } from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import { doubleCsrfProtection, prismaSession } from './utils'
import cookieParser from 'cookie-parser'
import { csrf_token } from './middlewares'
// import { corsOptions } from './constants';

export const app = express()
dotEnv.config()

//NOTE: some configs for the routes
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(prismaSession)

app.use(csrf_token)
app.use(oauth_router)
app.use(auth_router)
app.use(email_router)

app.listen(3000, () => {
  console.log('wild_duck server is runing and listening to the port : 3000')
})
