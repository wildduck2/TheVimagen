import { Router } from 'express'
import { postGoogleLogin } from '../../controllers'

const oauthRouter = Router()

oauthRouter.get('/oauth/google', postGoogleLogin)

export { oauthRouter }
