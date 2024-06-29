import { Router } from 'express'
import { get_google_login, post_google_login } from '../../controllers'

const oauth_router = Router()

oauth_router.get('/oauth/signin-google', get_google_login)
oauth_router.get('/oauth/google', post_google_login)

export { oauth_router }
