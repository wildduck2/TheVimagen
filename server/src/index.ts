import express from 'express'
import dotEnv from 'dotenv'
import { oauth_router, auth_router, email_router } from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import { prismaSession } from './utils'
import cookieParser from 'cookie-parser'
// import { csrf_token } from './middlewares';
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
// app.use(doubleCsrfProtection);

// app.use(csrf_token)
app.use(oauth_router)
app.use(auth_router)
app.use(email_router)

app.listen(3000, () => {
    console.log('wild_duck server is runing and listening to the port : 3000')
})

// const url = getGoogleOAuthURL()
// console.log(url)
//
declare global {
    interface Wildduck {
        userName: string
        age: number
    }
}
import 'virtual:*'

declare module 'virtual:*' {
    // eslint-disable-next-line
    const component: any
    export default component
}

const myDuck: Wildduck = {
    userName: 'Daffy',
    age: 4
}

console.log(`User: ${myDuck.userName}, Age: ${myDuck.age}`)

const manga: Foo = {}
